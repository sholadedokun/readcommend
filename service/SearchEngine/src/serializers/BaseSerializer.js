export default class BaseSerializer {
  constructor(object){
    this.object = object
  }

  serialize = () => {
    if(Array.isArray(this.object)){
      return this.object.map((obj)=>this.serializableFields(obj.toJSON()))
    }
    else if(!!this.isObjectFilled(this.object)) {
      return this.serializableFields(this.object) 
    }
    return this.object
  }

  isObjectFilled = (obj)=> !!Object.keys(obj).length
}