import BaseController from "./BaseController.js"
import genre from "../../models/Genre.js"
import GenreQueryService from "../../queryServices/GenreQueryService.js"
import GenreSerializer from "../../serializers/GenreSerializer.js"

class GenreController extends BaseController {
  static getAllGenres = async(req, res) => {
    const { query } = req
    try {
      const queryService = new GenreQueryService(query)
  
      const allRawGenres = await queryService.getAll()
      const serializedAllGenres = new GenreSerializer(allRawGenres).serialize()
      res.status(200).json(serializedAllGenres)
    }
    catch(err){
      res.status(500).json({"message":"Internal error, please try again"})
    }
  }
}


export default GenreController