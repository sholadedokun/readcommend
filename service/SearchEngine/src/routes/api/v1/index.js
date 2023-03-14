import { Router } from "express";
const v1Route = Router();

v1Route.get("/books", (req, res) => {
  res.json({});
});
v1Route.use("*", (req, res) => {
  res.status(404).json({ body: "invalid route" })
});

export default v1Route;