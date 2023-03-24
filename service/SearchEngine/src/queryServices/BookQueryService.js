import BaseQueryService from "./BaseQueryService.js"
import book from "../models/Book.js"

class BookQueryService extends BaseQueryService{
  constructor(query){
    super(query)
    this.model = book
  }
  associations = ['author', 'genre']
  associationFieldMap = {
    authors:"author",
    genres:"genre"
  }
  columnNameFieldMap = {
    authors:"author_id",
    genres:"genre_id",
    "min-year":"year_published",
    "max-year":"year_published",
    "min-pages":"pages",
    "max-pages":"pages",
  }
  allowedFields = [
    "authors",
    "genres",
    "min-pages",
    "max-pages",
    "min-year",
    "max-year"
  ]

  order = () => [['rating', 'DESC']]
}

export default BookQueryService