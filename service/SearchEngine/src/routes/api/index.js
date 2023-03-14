//// index.js
const apiRoute = require("express").Router()
const v1 = require("./v1");

apiRoute.use("/v1", v1)
apiRoute.use("*", (req, res) => {
  res.status(404).json({ body: "invalid route" });
});

module.exports = apiRoute