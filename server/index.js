const express = require("express");
const bodyParser = require("body-parser");
const cassandra = require("cassandra-driver");
const { v4: uuidv4 } = require("uuid");

const PORT = process.env.PORT || 3001;

const app = express();

app.use(bodyParser.json());

// Initial Cassandra client configuration without keyspace
const client = new cassandra.Client({
  contactPoints: ["localhost"], // Replace with your ScyllaDB node address
  localDataCenter: "datacenter1",
});

// Function to create the keyspace
const createKeyspace = async () => {
  const query = `
        CREATE KEYSPACE IF NOT EXISTS school
        WITH replication = {'class': 'SimpleStrategy', 'replication_factor': 1};
    `;
  await client.execute(query);
};

// Function to reconfigure client with the keyspace
const configureClientWithKeyspace = () => {
  client.keyspace = "school";
};

app.get("/api", (req, res) => {
  res.json({ message: "Hello from server!" });
});

// Function to create students table if it doesn't exist
const createTable = async () => {
  const query = `
        CREATE TABLE IF NOT EXISTS students (
            id UUID PRIMARY KEY,
            name TEXT,
            age INT,
            class TEXT
        );
    `;
  await client.execute(query);
};

// Get all students
app.get("/students", async (req, res) => {
  const query = "SELECT * FROM students";
  const result = await client.execute(query);
  console.log(result);
  res.json(result.rows);
});

// app.get('/students', (req, res) => {
//   res.json({ message: ["Student1", "Student2", "Student3"] });
// });

// Start the server, create the keyspace, configure the client, and create the table
app.listen(PORT, async () => {
  try {
    await createKeyspace();
    configureClientWithKeyspace();
    await createTable();
    console.log(`Server is running on http://localhost:${PORT}`);
  } catch (err) {
    console.error("Error starting the server:", err);
  }
});

// app.listen(PORT, () => {
//   console.log(`Server listening on ${PORT}`);
// });
