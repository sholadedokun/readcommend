import BaseSerializer from "./BaseSerializer.js"

export default class GenreSerializer extends BaseSerializer {
  serializableFields = (obj)=> {
    return {
      title: obj.title,
      id: obj.id,
    }
  }
}