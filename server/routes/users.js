const express = require("express")
const usersRouter = express.Router()

const { posts } = require('../databases/postgres/postgres');

usersRouter.use(logger)

usersRouter.post("/register", async (req, res) => {
try {
    const content = req.body;
    await users.create(content);
    res.json({message: "User successfully added!"});
} catch (error) {
    console.log('ERROR:', error);
    res.status(500).json({ error: error.message });
}
});

usersRouter.get("/", async (req, res) => {
  try {
    const usersList = await users.findAll();
    res.status(200).json(usersList);
  } catch (error) {
    console.log('ERROR:', error);
    res.status(500).json({ error: error.message });
  }
});

function logger(req, res, next) {
  console.log(req.originalUrl)
  next()
}

module.exports = usersRouter