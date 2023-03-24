import GenreSerializer from '../GenreSerializer.js'
// import genreFactory from '../../test/factories/genreFactory'
import {dropAllTables} from "../../test/util"
// import genre from '../../models/Genre'
xdescribe("Genre Serializer", ()=>{
  let serializableObject = {}
  const genreSerializer = ()=> new GenreSerializer(serializableObject)

  describe("serialize()", ()=>{
    describe("when the serializable object is an genre object", ()=>{
      beforeEach(async()=>{
        await genreFactory()
      })
      afterEach(async()=>{
        await dropAllTables()
      })
      test("should serialize object", async()=>{        
        const genreObj = await genre.findAll({limit:1})
        serializableObject = genreObj[0];
        const expectedResponse = {
          lastName: serializableObject.title,
          id: serializableObject.id,
        }
               
        const response = genreSerializer().serializableFields(serializableObject)
        expect(response).toEqual(expectedResponse)
      })
    })
    describe("when the serializable object is an empty object", ()=>{
      test("should serialize the object", ()=>{
        serializableObject = {}
        const response = genreSerializer().serializableFields(serializableObject)
        expect(response).toEqual({})
      })
    })
  })
})