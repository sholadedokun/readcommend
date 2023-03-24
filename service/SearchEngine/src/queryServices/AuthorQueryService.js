import BaseQueryService from "./BaseQueryService.js"
import author from "../models/Author.js"

class AuthorQueryService extends BaseQueryService{
  constructor(query){
    super(query)
    this.model = author
    
  }
}

export default AuthorQueryService