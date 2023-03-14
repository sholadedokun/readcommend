//// index.js
const v1Route = require("express").Router();

v1Route.get("/books", (req, res) => {
  res.json({});
});
v1Route.use("*", (req, res) => {
  res.status(404).json({ body: "invalid route" })
});

module.exports = v1Route;