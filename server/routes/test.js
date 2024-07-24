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

module.exports = testRouter