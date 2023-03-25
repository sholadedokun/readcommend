import BaseController from "./BaseController.js"
import era from "../../models/Era.js"
import EraQueryService from "../../queryServices/EraQueryService.js"
import EraSerializer from "../../serializers/EraSerializer.js"

class EraController extends BaseController {
  static getAllEras = async(req, res) => {
    const { query } = req
    try {  
      const allRawEras = await this.queryService(this.sanitiseInput(query))
      const serializedEras = this.serializer(allRawEras)
      res.status(200).json(serializedEras)
    }
    catch(err){
      res.status(500).json({"message":"Internal error, please try again"})
    }
  }
  static queryService = async (query)=>  await new EraQueryService(query).getAll()
  static serializer = (data)=> new EraSerializer(data).serialize()
}

export default EraController