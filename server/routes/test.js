const express = require("express")
const testRouter = express.Router()

const { posts } = require('../databases/postgres/postgres');
const mongoConnection = require('../databases/mongo');

testRouter.use(logger)

testRouter.get("/", (req, res) => {
  res.status(200).json({ message: "Hello from server!" });
})

testRouter.get("/db", async (req, res) => {
  try {
    // const postsList = await posts.findAll();
    // res.status(200).json(postsList);
    const mongoDb = await mongoConnection();

    let collection = await mongoDb.collection("posts");
    let results = await collection.findOne({});

    console.log(results.content);
  
      res.status(200).json(results.content);
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