import BaseController from "./BaseController.js"
import era from "../../models/Size.js"
import SizeQueryService from "../../queryServices/SizeQueryService.js"
import SizeSerializer from "../../serializers/SizeSerializer.js"

class SizeController extends BaseController {
  static getAllSizes = async(req, res) => {
    const { query } = req
    try {  
      const allRawSizes = await this.queryService(this.sanitiseInput(query))
      const serializedSizes = this.serializer(allRawSizes)
      res.status(200).json(serializedSizes)
    }
    catch(err){
      res.status(500).json({"message":"Internal error, please try again"})
    }
  }
  static queryService = async (query)=>  await new SizeQueryService(query).getAll()
  static serializer = (data)=> new SizeSerializer(data).serialize()
}

export default SizeController