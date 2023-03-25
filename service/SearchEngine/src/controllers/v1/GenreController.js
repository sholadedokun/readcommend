import BaseController from "./BaseController.js"
import GenreQueryService from "../../queryServices/GenreQueryService.js"
import GenreSerializer from "../../serializers/GenreSerializer.js"

class GenreController extends BaseController {
  static getAllGenres = async(req, res) => {
    const { query } = req
    try {  
      const allRawGenres = await this.queryService(this.sanitiseInput(query))
      const serializedAllGenres = this.serializer(allRawGenres)
      res.status(200).json(serializedAllGenres)
    }
    catch(err){
      res.status(500).json({"message":"Internal error, please try again"})
    }
  }
  static queryService = async (query)=>  await new GenreQueryService(query).getAll()
  static serializer = (data)=> new GenreSerializer(data).serialize()
}


export default GenreController