import BookQueryService from '../BookQueryService.js'

describe("Book Query Serivce", () => {
  const queryService = new BookQueryService()

  describe("associationFieldMap", () => {
    test("mathces exactly the instance's associationFieldMap", ()=>{
      const associationFieldMap = {
        authors:"author",
        genres:"genre"
      }
      expect(queryService.associationFieldMap).toEqual(associationFieldMap)
    })
  })

  describe("columnNameFieldMap", () => {
    test("mathces exactly the instance's columnNameFieldMap", ()=>{
      const columnNameFieldMap = {
        authors:"author_id",
        genres:"genre_id",
        "min-year":"year_published",
        "max-year":"year_published",
        "min-pages":"pages",
        "max-pages":"pages",
      }
      expect(queryService.columnNameFieldMap).toEqual(columnNameFieldMap)
    })
  })

  describe("allowedFields", () => {
    test("mathces exactly the instance's allowedFields", ()=>{
      const allowedFields = [
        "authors",
        "genres",
        "min-pages",
        "max-pages",
        "min-year",
        "max-year"
      ]
      expect(queryService.allowedFields).toEqual(allowedFields)
    })
  })

  describe("order", ()=>{
    const order = [['rating', 'DESC']]
    test("mathces exactly the instance's order",  () => {
      expect(queryService.order()).toEqual(order)
    })
  })
})