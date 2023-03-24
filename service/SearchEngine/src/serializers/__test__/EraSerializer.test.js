import EraSerializer from '../EraSerializer.js'
import eraFactory from '../../test/factories/eraFactory'
import {dropAllTables} from "../../test/util"
import era from '../../models/Era'

describe("Era Serializer", ()=>{
  let serializableObject = {}
  const eraSerializer = ()=> new EraSerializer(serializableObject)

  describe("serialize()", ()=>{
    describe("when the serializable object is an era object", ()=>{
      beforeEach(async()=>{
        await eraFactory()
      })
      afterEach(async()=>{
        await dropAllTables()
      })
      test("should serialize object", async()=>{        
        const eraObj = await era.findAll({limit:1})
        serializableObject = eraObj[0];
        const expectedResponse = {
          title: serializableObject.title,
          minYear: serializableObject.min_year,
          maxYear: serializableObject.max_year,
          id: serializableObject.id
        }
               
        const response = eraSerializer().serializableFields(serializableObject)
        expect(response).toEqual(expectedResponse)
      })
    })
    describe("when the serializable object is an empty object", ()=>{
      test("should serialize the object", ()=>{
        serializableObject = {}
        const response = eraSerializer().serializableFields(serializableObject)
        expect(response).toEqual({})
      })
    })
  })
})