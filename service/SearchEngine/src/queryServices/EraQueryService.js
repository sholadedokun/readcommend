import BaseQueryService from "./BaseQueryService.js"
import era from "../models/Era.js"
class EraQueryService extends BaseQueryService{
  constructor(query){
    super(query)
    this.model = era
  }
}

export default EraQueryService