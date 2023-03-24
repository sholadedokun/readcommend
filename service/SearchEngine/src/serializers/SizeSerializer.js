import BaseSerializer from "./BaseSerializer.js"

export default class GenreSerializer extends BaseSerializer {
  serializableFields = (obj)=> {
    return {
      title: obj.title,
      minPages: obj.min_pages,
      maxPages: obj.max_pages,
      id: obj.id,
    }
  }
}