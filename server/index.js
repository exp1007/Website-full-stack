const express = require("express");
const bodyParser = require("body-parser");
const { v4: uuidv4 } = require("uuid");
const app = express();

const testRouter = require("./routes/test")
const postsRouter = require("./routes/posts");
const usersRouter = require("./routes/users");

app.use(express.json())
app.use("/test", testRouter)
app.use("/posts", postsRouter)
app.use("/users", usersRouter)

const db = require("./models");

// Start the server
db.sequelize.sync().then(() => {
  const PORT = process.env.PORT || 3001;

  app.listen(PORT, async () => {
    try {
      console.log(`Server is running on http://localhost:${PORT}`);
    } catch (err) {
      console.error("Error starting the server:", err);
    }
  });
});
