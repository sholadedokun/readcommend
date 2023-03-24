import BookSerializer from '../BookSerializer.js'
import bookFactory from '../../test/factories/bookFactory'
import {dropAllTables} from "../../test/util"
import book from '../../models/Book'
import sinon from "sinon"

describe("Book Serializer", ()=>{
  let serializableObject = {}
  let toJsonSpy = sinon.spy()
  const bookSerializer = ()=> new BookSerializer(serializableObject)

  describe("serialize()", ()=>{

    
    describe("when the serializable Object a book object", ()=>{
      beforeEach(async()=>{
        await bookFactory()
      })
      afterEach(async()=>{
        await dropAllTables()
      })
      test("should serialize object", async()=>{        
        const bookObj = await book.findAll({limit:1, include:['author','genre']})
        serializableObject = bookObj[0];
        const expectedResponse = {
          author: {
            firstName: serializableObject.author.first_name,
            lastName: serializableObject.author.last_name,
            id: serializableObject.author.id,
          },
          genre: {
            title:serializableObject.genre.title,
            id:serializableObject.genre.id
          },
          id: serializableObject.id,
          pages: serializableObject.pages,
          rating: serializableObject.rating,
          title: serializableObject.title,
          yearPublished: serializableObject.year_published
        }
       
        const response = bookSerializer().serializableFields(serializableObject)
        expect(response).toEqual(expectedResponse)
      })
    })
    describe("when the serializable object an empty object", ()=>{
      test("should serialize the object", ()=>{
        serializableObject = {}
        const response = bookSerializer().serializableFields(serializableObject)
        expect(response).toEqual({})
      })
    })
  })
})