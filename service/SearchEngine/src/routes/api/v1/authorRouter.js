import { Router } from "express";
import AuthorController from "../../../controllers/v1/AuthorController.js"

const authorRouter = Router();
authorRouter.get("/", AuthorController.getAllAuthors)

export default authorRouter