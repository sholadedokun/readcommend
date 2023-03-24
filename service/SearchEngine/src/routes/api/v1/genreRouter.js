import { Router } from "express";
import GenreController from "../../../controllers/v1/GenreController.js"

const genreRouter = Router();
genreRouter.get("/", GenreController.getAllGenres)

export default genreRouter