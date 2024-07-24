const express = require("express")
const postsRouter = express.Router()

const { posts } = require('../models');

postsRouter.use(logger)

postsRouter.post("/new", async (req, res) => {
try {
    const content = req.body;
    await posts.create(content);
    res.json({message: "Post successfully added!"});
} catch (error) {
    console.log('ERROR:', error);
    res.status(500).json({ error: error.message });
}
});

postsRouter.get("/", async (req, res) => {
  try {
    const postsList = await posts.findAll();
    res.status(200).json(postsList);
  } catch (error) {
    console.log('ERROR:', error);
    res.status(500).json({ error: error.message });
  }
});

function logger(req, res, next) {
  console.log(req.originalUrl)
  next()
}

module.exports = postsRouter