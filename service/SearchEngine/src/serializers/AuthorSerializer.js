import BaseSerializer from "./BaseSerializer.js"

export default class AuthorSerializer extends BaseSerializer {
  serializableFields = (obj)=> {
    return (this.isObjectFilled(obj)? {
        firstName: obj.first_name,
        lastName: obj.last_name,
        id: obj.id,
      }:obj
    )
  }
}