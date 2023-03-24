import BaseQueryService from "./BaseQueryService.js"
import genre from "../models/Genre.js"

class GenreQueryService extends BaseQueryService{
  constructor(query){
    super(query)
    this.model = genre
    
  }
}

export default GenreQueryService