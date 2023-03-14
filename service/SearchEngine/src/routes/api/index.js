import { Router } from "express";
import v1Route from "./v1/index.js";

const apiRoute = Router()

apiRoute.use("/v1", v1Route)
apiRoute.use("*", (req, res) => {
  res.status(404).json({ body: "invalid route" });
});

export default apiRoute