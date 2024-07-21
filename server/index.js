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
  console.log("Keyspace is %s", client.keyspace);
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
  const query = "SELECT id FROM school.students WHERE id=3a87d087-a13e-48af-ae5f-a4ff024c2433";
  const result = await client.execute(query);
  const ids = result.rows.map(row => row.id.toString()).sort();
  console.log(ids);
  res.json(ids);
});

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