const express = require("express")
const testRouter = express.Router()

const { posts } = require('../models');

testRouter.use(logger)

testRouter.get("/", (req, res) => {
  res.status(200).json({ message: "Hello from server!" });
})

testRouter.get("/db", async (req, res) => {
  try {
    const postsList = await posts.findAll();
    const title = postsList.length > 0 ? postsList[0].title : null;
    res.status(200).json(title);
  } catch (error) {
    console.log('ERROR:', error);
    res.status(500).json({ error: error.message });
  }
});

function logger(req, res, next) {
  console.log(req.originalUrl)
  next()
}

module.exports = testRouter