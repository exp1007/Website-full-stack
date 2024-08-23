const express = require("express")
const postsRouter = express.Router()

const mongoConnection = require('../databases/mongo');

postsRouter.use(logger)

postsRouter.post("/new", async (req, res) => {
  try {
    const mongoDb = await mongoConnection();

    let collection = await mongoDb.collection("posts");
    let results = await collection.insertOne(req.body);
  
      res.status(200).json(results);
  } catch (error) {
    console.log('ERROR:', error);
    res.status(500).json({ error: error.message });
  }
});

postsRouter.get("/", async (req, res) => {
  try {
    const mongoDb = await mongoConnection();

    let collection = await mongoDb.collection("posts");
    let results = await collection.find({})
      .limit(50)
      .toArray();
  
      res.status(200).json(results);
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