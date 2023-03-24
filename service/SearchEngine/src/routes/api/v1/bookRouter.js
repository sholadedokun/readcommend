import { Router } from "express";
import BookController from "../../../controllers/v1/BookController.js"

const bookRouter = Router();
bookRouter.get("/", BookController.getAllBooks)

export default bookRouter