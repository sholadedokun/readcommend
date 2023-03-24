import AuthorSerializer from '../AuthorSerializer.js'
// import authorFactory from '../../test/factories/authorFactory'
import {dropAllTables} from "../../test/util"
// import author from '../../models/Author'
xdescribe("Author Serializer", ()=>{
  let serializableObject = {}
  const authorSerializer = ()=> new AuthorSerializer(serializableObject)

  describe("serialize()", ()=>{
    describe("when the serializable object is an author object", ()=>{
      beforeEach(async()=>{
        await authorFactory()
      })
      afterEach(async()=>{
        await dropAllTables()
      })
      test("should serialize object", async()=>{        
        const authorObj = await author.findAll({limit:1})
        serializableObject = authorObj[0];
        const expectedResponse = {
          firstName: serializableObject.first_name,
          lastName: serializableObject.last_name,
          id: serializableObject.id,
        }
               
        const response = authorSerializer().serializableFields(serializableObject)
        expect(response).toEqual(expectedResponse)
      })
    })
    describe("when the serializable object is an empty object", ()=>{
      test("should serialize the object", ()=>{
        serializableObject = {}
        const response = authorSerializer().serializableFields(serializableObject)
        expect(response).toEqual({})
      })
    })
  })
})