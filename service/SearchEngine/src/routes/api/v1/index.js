import { Router } from "express";
import bookRouter from "./bookRouter.js"
import authorRouter from "./authorRouter.js";
// import genreRouter from "./genreRouter.js";
// import eraRouter from "./eraRouter.js";
// import sizeRouter from "./sizeRouter.js";
const v1Route = Router();

v1Route.use("/books", bookRouter);
v1Route.use("/authors", authorRouter);
// v1Route.use("/genres", genreRouter);
// v1Route.use("/eras", eraRouter);
// v1Route.use("/sizes", sizeRouter);


v1Route.use("*", (req, res) => {
  res.status(404).json({ body: "invalid route" })
});

export default v1Route;