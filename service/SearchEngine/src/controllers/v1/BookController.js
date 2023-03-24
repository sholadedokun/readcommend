import BaseController from "./BaseController.js"
import book from "../../models/Book.js"
import BookQueryService from "../../queryServices/BookQueryService.js"
import BookSerializer from "../../serializers/BookSerializer.js"

class BookController extends BaseController {
  static getAllBooks = async(req, res) => {
    const { query } = req
    try {      
      const allRawBooks = await this.queryService(query)
      const serializedBooks = this.serializer(allRawBooks)
      res.status(200).send(serializedBooks)
    }
    catch(err){
      // console.log(err)
      res.status(err.errCode || err.errorCode || 500 ).send({"message": err.message || "Internal error, please try again"})
    }
  }

  static queryService = async (query)=>  await new BookQueryService(query).getAll()
  static serializer = (data)=> new BookSerializer(data).serialize()
}

export default BookController