import sanitise from "sanitize"
export default class BaseController {
  static DEFAULT_VAL_RANGES = ()=> ({
    MIN_YEAR: 1800,
    MAX_YEAR: 2100,
    MAX_PAGES: 10000,
    MIN_PAGES: 1
  })
  static sanitiseInput = (object)=> { 
    try{
      for(const key in object) {
        const validPatterns = this.validInputPatterns()
        object[key] = sanitise().value(object[key], validPatterns[key])
      }
      return object
    }
    catch(e){
      throw({errCode: 400, message: "invalid query parameters"})
    }
  }
  static validInputPatterns = ()=>(
  { 
    limit: this.tryInt,
    authors: /^([0-9]+,)*[0-9]+$/,
    genres:  /^([0-9]+,)*[0-9]+$/,
    "max-pages": this.maxPagVal,
    "min-pages": this.minPageVal,
    "max-year": this.maxYearVal,
    "min-year": this.maxYearVal,
  })

  static tryInt = (val) => {
    if(parseInt(val)) return val
    throw new error
  }

  static minPageVal = (val) => {
    if(this.tryInt(val) < this.DEFAULT_VAL_RANGES().MIN_PAGES){ throw(new error) }
    return val
  }
  static maxPagVal = (val) => {
    if(this.tryInt(val) > this.DEFAULT_VAL_RANGES().MAX_PAGES){ throw(new error) }
    return val
  }
  static minYearVal = (val) => {
    if(this.tryInt(val) < this.DEFAULT_VAL_RANGES().MIN_YEAR){ throw(new error) }
    return val
  }
  static maxYearVal = (val) => {
    if(this.tryInt(val) > this.DEFAULT_VAL_RANGES().MAX_YEAR){ throw(new error) }
    return val
  }
}