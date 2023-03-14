import express, { urlencoded } from "express";
import BodyParser from "body-parser";
import cors from "cors";
import apiRoute from "./src/routes/api/index.js";

const app = express()
app.use(urlencoded({ extended: false }));
app.use(BodyParser.json())
app.use(cors())


app.use("/api", apiRoute)
app.use('*', function (req, res) {
  res.status(404).json({ body: "invalid route" })
})

export default app