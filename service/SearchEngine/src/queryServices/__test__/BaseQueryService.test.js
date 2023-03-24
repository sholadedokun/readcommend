import bookFactory from '../../test/factories/bookFactory.js';
import book from "../../models/Book.js"
import BaseQueryService from '../BaseQueryService'
import { dropAllTables } from '../../test/util.js';

describe("Base Query Serivce", () => {
  let query = { limit: 4 }
  let model = book;
  let association = ["author", "genre"]
  let Books = {}

  const queryService = ()=> {
    const baseQueryInstance = new BaseQueryService(query)
    setModelandAssociation(baseQueryInstance, model, association)
    return baseQueryInstance
  }

  describe("getAll", () => {
    describe("when there is no item in the database", () => {
      test('should respond with an empty list', async () => {
        const response = await queryService().getAll();
        expect(response).toEqual([])
      })
    })
    
    describe("when there are items in the database", ()=>{
      beforeEach(async()=> {
        await bookFactory()
        await bookFactory()
        await bookFactory()
        await bookFactory()
      })

      afterEach(async()=>{
        await dropAllTables()
      })

      test("should return with an array of all the items", async() =>{
         
        const response = await queryService().getAll();
        expect(response.length).toEqual(4)
      })

      describe("and query is set", ()=> {
        describe("and limit is set in query", ()=>{
          describe("and the limit is less than the available records", ()=>{
            test("should return with total result length equal to the limit", async()=>{
              query = { limit: 3 }
              const response = await queryService().getAll();
              expect(response.length).toEqual(3)
            })
          })

          describe("and the limit is higher than the available records", () => {
            test("should respond with the available records", async() => {
              query = { limit: 5 }
              const response = await queryService().getAll();
              expect(response.length).toEqual(4)
            })
          })
        })
        describe("and other filters are set in the query", ()=>{            
          beforeEach(async()=> {
            Books = await book.findAll()
          })
          describe("and an associated field is in the query filter", ()=>{     
            test("should return with only records with the associated field value", async()=>{
              const {author_id} = Books[0]
              await bookFactory({author_id})
              query = { authors:`${author_id}` }
              
              const baseQueryInstance = queryService()
              setAssociationAndFiedMaping(baseQueryInstance, "authors", "author_id", "author")
              const response = await baseQueryInstance.getAll()

              expect(response.length).toEqual(2)
              expect(response[0].author.id).toEqual(response[1].author.id)
              expect(response[0].author.id).toEqual(author_id)
              expect(response[0].author_id).toEqual(response[1].author_id)
              expect(response[0].author_id).toEqual(author_id)
            })

            describe("and there are more than one associated fields", ()=>{
              test("should return only result that contains value of all the associated fields", async()=>{
                const {author_id, genre_id} = Books[0]
                await bookFactory({author_id, genre_id })
                await bookFactory({author_id, genre_id })
                await bookFactory({genre_id})
                await bookFactory({author_id})
                query = { authors:`${author_id}`, genres:`${genre_id}` }
                
                const baseQueryInstance = queryService()
                setAssociationAndFiedMaping(baseQueryInstance, "authors", "author_id", "author")
                setAssociationAndFiedMaping(baseQueryInstance, "genres", "genre_id", "genre")
                const response = await baseQueryInstance.getAll()
                expect(response.length).toEqual(3)
              })
            })
          })

          describe("and there is a filter with a 'min' prefix", ()=> {
            test("should return records only with the minimum value", async()=>{
              await bookFactory({rating: 2.0})
              await bookFactory({rating: 1.9})
              await bookFactory({rating: 3.9})

              query = { "min-rating":2 }
              const baseQueryInstance = queryService()
              setAllowedAndColuimnNameField(baseQueryInstance,"min-rating", "rating")
              const response = await baseQueryInstance.getAll()

              expect(response.length).toEqual(2)
            })
          })
          describe("and there is a filter with a 'max' prefix", ()=> {
            test("should return records only with the minimum value", async()=>{
              await bookFactory({rating: 2.0})
              await bookFactory({rating: 1.9})
              await bookFactory({rating: 3.9})

              query = { "max-rating":1.9 }
              const baseQueryInstance = queryService()
              setAllowedAndColuimnNameField(baseQueryInstance,"max-rating", "rating")
              const response = await baseQueryInstance.getAll()

              expect(response.length).toEqual(5)
            })
          })
          describe("and there is a filter with both 'max' and 'min' prefix of the same field", ()=> {
            test("should return records only with the minimum value", async()=>{
              await bookFactory({rating: 2.0})
              await bookFactory({rating: 1.9})
              await bookFactory({rating: 3.9})

              query = { "max-rating":3.9, "min-rating":1.9 }
              const baseQueryInstance = queryService()
              setAllowedAndColuimnNameField(baseQueryInstance,"max-rating", "rating")
              setAllowedAndColuimnNameField(baseQueryInstance,"min-rating", "rating")
              const response = await baseQueryInstance.getAll()

              expect(response.length).toEqual(3)
            })
          })
          describe("and there is a filter with no 'min' or 'max' prefix", ()=> {
            test("should return records only with the value", async()=>{
              await bookFactory({"year_published": 2023})
              await bookFactory({"year_published": 2001})
              await bookFactory({"year_published": 2023})

              query = { "year":2023 }
              const baseQueryInstance = queryService()
              setAllowedAndColuimnNameField(baseQueryInstance,"year", "year_published")
              const response = await baseQueryInstance.getAll()

              expect(response.length).toEqual(2)
              expect(response[0].year_published).toEqual(response[1].year_published)
              expect(response[0].year_published).toEqual(2023)
            })
          })
        })
        describe("and the query string is invalid", ()=>{
          test("should throw an error if a valid field doesn't have a value", async()=>{
            query = { authors: null }
            const baseQueryInstance = queryService()
            setAllowedAndColuimnNameField(baseQueryInstance,"year", "year_published")
            setAssociationAndFiedMaping(baseQueryInstance, "authors", "author_id", "author")
            await expect(baseQueryInstance.getAll()).rejects.toEqual({errCode: 400, message:"invalid query parameters"})
          })
          test("should throw an error if a field is not included in the allowed fields", async()=>{
            query = { author: "2"  }
            const baseQueryInstance = queryService()
            setAssociationAndFiedMaping(baseQueryInstance, "authors", "author_id", "author")
            await expect(baseQueryInstance.getAll()).rejects.toEqual({errCode: 400, message:"invalid query parameters"})
          })
          test("should throw an error if the query include valid fields and an invalid field", async()=>{
            query = { year:2022, "max-rating":1.9, author: "2"  }
            const baseQueryInstance = queryService()
            setAllowedAndColuimnNameField(baseQueryInstance,"year", "year_published")
            setAllowedAndColuimnNameField(baseQueryInstance,"max-rating", "rating")
            setAssociationAndFiedMaping(baseQueryInstance, "authors", "author_id", "author")
            await expect(baseQueryInstance.getAll()).rejects.toEqual({errCode: 400, message:"invalid query parameters"})
          })
        })
      })
    })
  })

  const setAssociationAndFiedMaping = (classInst, fieldName, columnName, associationName ) =>{
    setAllowedAndColuimnNameField(classInst,fieldName, columnName)    
    classInst.associationFieldMap[fieldName] = associationName
  }

  const setAllowedAndColuimnNameField = (classInst, fieldName, columnName) =>{
    classInst.allowedFields.push(fieldName)
    classInst.columnNameFieldMap[fieldName]= columnName
  }
  const setModelandAssociation = (classInst, model, associations)=>{
    classInst.model = model;
    classInst.associations = associations
  }
})