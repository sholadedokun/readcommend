import BaseController from "./BaseController.js"
import AuthorQueryService from "../../queryServices/AuthorQueryService.js"
import AuthorSerializer from "../../serializers/AuthorSerializer.js"

class AuthorController extends BaseController {
  static getAllAuthors = async(req, res) => {
    const { query } = req
    try {
      const allRawBooks = await this.queryService(query)
      const serializedBooks = this.serializer(allRawBooks)
      res.status(200).send(serializedBooks)
    }
    catch(err){
      res.status(err.errCode || err.errorCode || 500 ).send({"message": err.message || "Internal error, please try again"})
    }
  }

  static queryService = async (query)=>  await new AuthorQueryService(query).getAll()
  static serializer = (data)=> new AuthorSerializer(data).serialize()
}


export default AuthorController