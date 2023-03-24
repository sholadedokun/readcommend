import BaseController from "./BaseController.js"
import era from "../../models/Era.js"
import EraQueryService from "../../queryServices/EraQueryService.js"
import EraSerializer from "../../serializers/EraSerializer.js"

class EraController extends BaseController {
  static getAllEras = async(req, res) => {
    const { query } = req
    try {
      const queryService = new EraQueryService(query)
  
      const allRawEras = await queryService.getAll()
      const serializedEras = new EraSerializer(allRawEras).serialize()
      res.status(200).json(serializedEras)
    }
    catch(err){
      res.status(500).json({"message":"Internal error, please try again"})
    }
  }
}

export default EraController