import BaseSerializer from "./BaseSerializer.js"
import AuthorSerializer from "./AuthorSerializer.js"
import GenreSerializer from "./GenreSerializer.js"

export default class BookSerializer extends BaseSerializer {
  serializableFields = (obj)=> {
    return (this.isObjectFilled(obj)? {
        author: new AuthorSerializer(obj.author).serialize(),
        genre: new GenreSerializer(obj.genre).serialize(),
        id: obj.id,
        pages: obj.pages,
        rating: obj.rating,
        title: obj.title,
        yearPublished: obj.year_published
      }
      :obj
    )
  }
}