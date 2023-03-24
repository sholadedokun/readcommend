import BaseController from "./BaseController.js"
import era from "../../models/Size.js"
import SizeQueryService from "../../queryServices/SizeQueryService.js"
import SizeSerializer from "../../serializers/SizeSerializer.js"

class SizeController extends BaseController {
  static getAllSizes = async(req, res) => {
    const { query } = req
    try {
      const queryService = new SizeQueryService(query)
  
      const allRawSizes = await queryService.getAll()
      const serializedSizes = new SizeSerializer(allRawSizes).serialize()
      res.status(200).json(serializedSizes)
    }
    catch(err){
      res.status(500).json({"message":"Internal error, please try again"})
    }
  }
}

export default SizeController