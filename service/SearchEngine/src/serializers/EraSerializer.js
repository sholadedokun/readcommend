import BaseSerializer from "./BaseSerializer.js"

export default class EraSerializer extends BaseSerializer {
  serializableFields = (obj)=> {
    return {
      title: obj.title,
      minYear: obj.min_year,
      maxYear: obj.max_year,
      id: obj.id,
    }
  }
}