const express = require("express");
const bodyParser = require("body-parser");
const { v4: uuidv4 } = require("uuid");

const app = express();

const testRouter = require("./routes/test")

app.use("/test", testRouter)

// Start the server
const PORT = process.env.PORT || 3001;
app.listen(PORT, async () => {
  try {
    console.log(`Server is running on http://localhost:${PORT}`);
  } catch (err) {
    console.error("Error starting the server:", err);
  }
});
