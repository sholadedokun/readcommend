import { Op } from "sequelize"
export default class BaseQueryService {
  constructor(query){
    this.query = query;
    this.whereClause = {};
    this.builtValidLogicalOperationQuery = {}
  }
  associationFieldMap = {}
  columnNameFieldMap = {}
  allowedFields = []

  defaultFields = ["limit", "order"]

  getAll = async()=> {
    const { limit } = this.query
    this.buildWhereClause()
    return await this.model.findAll({ limit, include: this.associations, where: this.whereClause, order:this.order()}) || []
  }

  buildWhereClause = () => {    
    for(const field in this.query){
      if(this.defaultFields.includes(field)) continue;
      if((this.allowedFields.includes(field) && !!this.query[field])){       
        this.setFilterQuery(field)
      }
      else {
        throw({errCode: 400, message:"invalid query parameters"})
      }
    }
  }

  order = () => [['id', 'ASC']]

  setFilterQuery = (field) => {
    const columnName = this.getColumnName(field)
    if(this.isAssociatedField(field)) {      
      this.whereClause[columnName] = this.query[field]?.split(",")
    }
    else{
      const fieldPrefix = field.split("-")[0]
      switch(fieldPrefix) {
        case "min":
          this.buildLogicalOperationQuery(columnName, Op.gte, this.query[field])
          break;
        case "max":
          this.buildLogicalOperationQuery(columnName, Op.lte, this.query[field])
          break;
        default:
          this.whereClause[columnName] = { [Op.eq]: this.query[field] };
      }
    }
  }

  buildLogicalOperationQuery = (columnName, operationKey, value) => {
    if(!!this.whereClause[columnName]){
      const currentColumnOperationQuery = this.whereClause[columnName]

      if(!!currentColumnOperationQuery[operationKey] 
        || !!this.builtValidLogicalOperationQuery[columnName]
      ){
        throw({errCode: 400, message:"invalid query parameters"})
      }
      else {        
        this.whereClause[columnName] = {
          [Op.and]:{
            ...currentColumnOperationQuery,
            [operationKey]: value
          }
        }
        this.builtValidLogicalOperationQuery[columnName] = true;
      }      
    }
    else{
      this.whereClause[columnName] = { [operationKey]: value };
    }
  }

  processQueryInput = (userInput) => {
    //sanitise user's input
    const sanitisedInput = sanitiseUserInput(userInput)
  }

  sanitiseUserInput = (input) => {
    return input
  }

  getColumnName = (field) => this.columnNameFieldMap[field]

  isAssociatedField = (field) => !!this.model.associations[this.associationFieldMap[field]]
}