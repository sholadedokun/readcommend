import { Router } from "express";
import EraController from "../../../controllers/v1/EraController.js"

const eraRouter = Router();
eraRouter.get("/", EraController.getAllEras)

export default eraRouter