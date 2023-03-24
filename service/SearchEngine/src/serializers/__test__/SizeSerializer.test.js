import SizeSerializer from '../SizeSerializer.js'
import sizeFactory from '../../test/factories/sizeFactory'
import {dropAllTables} from "../../test/util"
import size from '../../models/Size'
describe("Size Serializer", ()=>{
  let serializableObject = {}
  const sizeSerializer = ()=> new SizeSerializer(serializableObject)

  describe("serialize()", ()=>{
    describe("when the serializable object is an size object", ()=>{
      beforeEach(async()=>{
        await sizeFactory()
      })
      afterEach(async()=>{
        await dropAllTables()
      })
      test("should serialize object", async()=>{        
        const sizeObj = await size.findAll({limit:1})
        serializableObject = sizeObj[0];
        const expectedResponse = {
          title: serializableObject.title,
          minPages: serializableObject.min_pages,
          maxPages: serializableObject.max_pages,
          id: serializableObject.id,
        }
               
        const response = sizeSerializer().serializableFields(serializableObject)
        expect(response).toEqual(expectedResponse)
      })
    })
    describe("when the serializable object is an empty object", ()=>{
      test("should serialize the object", ()=>{
        serializableObject = {}
        const response = sizeSerializer().serializableFields(serializableObject)
        expect(response).toEqual({})
      })
    })
  })
})