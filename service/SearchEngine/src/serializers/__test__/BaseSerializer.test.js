import BaseSerializer from '../BaseSerializer'
import sinon from "sinon"

describe("Base Serializer", ()=>{
  let serializableObject = {}
  let toJsonSpy = sinon.spy()
  const baseSerializer = ()=> new BaseSerializer(serializableObject)

  describe("serialize()", ()=>{
    
    describe("when the serializable object is an array of object", ()=>{
      test("should serialize each item in the array", ()=>{
        serializableObject = [createSerialiableElement(), createSerialiableElement()];
        const serializerInstance = baseSerializer()
        serializerInstance.serializableFields = sinon.spy()
        serializerInstance.serialize();
        expect(toJsonSpy.callCount).toEqual(2)        
        expect(serializerInstance.serializableFields.callCount).toEqual(2)
      })
    })

    describe("when the serializable object an object", ()=>{
      test("should serialize the object", ()=>{
        serializableObject = { id: 1 }
        const serializerInstance = baseSerializer()
        serializerInstance.serializableFields = sinon.spy()
        serializerInstance.serialize();
            
        expect(serializerInstance.serializableFields.calledOnceWith({ id: 1 })).toBe(true)
      })
    })
    describe("when the serializable object an empty object", ()=>{
      test("should serialize the object", ()=>{
        serializableObject = {}
        const serializerInstance = baseSerializer()
        serializerInstance.serializableFields = sinon.spy()
        const response = serializerInstance.serialize();
            
        expect(response).toEqual({})
        expect(serializerInstance.serializableFields.notCalled).toBe(true)
      })
    })
    describe("when the serializable Object an empty array", ()=>{
      test("should serialize the object", ()=>{
        serializableObject = []
        const serializerInstance = baseSerializer()
        serializerInstance.serializableFields = sinon.spy()
        const response = serializerInstance.serialize();
            
        expect(response).toEqual([])
        expect(serializerInstance.serializableFields.notCalled).toBe(true)
      })
    })
  })

  const createSerialiableElement = ()=> ({toJSON: toJsonSpy})
  
})