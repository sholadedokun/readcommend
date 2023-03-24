import BaseQueryService from "./BaseQueryService.js"
import size from "../models/Size.js"

class SizeQueryService extends BaseQueryService{
  constructor(query){
    super(query)
    this.model = size
    
  }
}

export default SizeQueryService