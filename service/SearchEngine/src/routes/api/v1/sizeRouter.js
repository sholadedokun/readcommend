import { Router } from "express";
import SizeController from "../../../controllers/v1/SizeController.js"

const sizeRouter = Router();
sizeRouter.get("/", SizeController.getAllSizes)

export default sizeRouter