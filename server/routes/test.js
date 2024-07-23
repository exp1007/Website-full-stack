const express = require("express")
const testRouter = express.Router()

const db = require('../config/db');

testRouter.use(logger)

testRouter.get("/", (req, res) => {
  res.status(200).json({ message: "Hello from server!" });
})

testRouter.get("/new", (req, res) => {
  res.render("users/new")
})

testRouter.get("/db", async (req, res) => {
  try {
    const data = await db.query('SELECT * FROM dummy_table');
    const names = data.length > 0 ? data[0].name : null;
    res.status(200).json(names);
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