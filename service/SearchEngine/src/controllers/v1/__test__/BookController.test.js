import BookController from '../BookController.js'
import sinon from "sinon"

describe("Book Controller", () => {
  describe("getAllBooks", () => {
    let res, req, sendSpy = {}
    let serializerStub, queryServiceStub
    beforeEach(()=> {
      sendSpy = sinon.spy()
      req = { query:{} }
      res = {
        status: sinon.stub().returns({ send: sendSpy }),
      }
    })

    afterEach(()=>{
      sinon.restore()
    })
    describe("when there is no book in the database", () => {
      test('should respond with an empty list', async () => {
        queryServiceStub = sinon.stub(BookController, "queryService")
        serializerStub = sinon.stub(BookController, "serializer").returns([])
        await BookController.getAllBooks(req, res);
        expect(res.status.calledOnceWith(200)).toBe(true)
        expect(queryServiceStub.calledOnceWith(req.query))
        expect(sendSpy.calledOnceWith([])).toBe(true)
      })
    })
    
    describe("when there are books in the database", ()=>{
      let expectedResult = [{id:1}, {id:2},{id:3},{id:4}]

      test("should respond with an array of all the books", async() =>{     
        queryServiceStub = sinon.stub(BookController, "queryService").resolves()
        sinon.stub(BookController, "serializer").returns(expectedResult)
        await BookController.getAllBooks(req, res);
        expect(res.status.calledOnceWith(200)).toBe(true)
        expect(queryServiceStub.calledOnceWith(req.query))
        expect(sendSpy.calledOnceWith(expectedResult)).toBe(true)
      })
    })
    describe("when an error occrs", ()=>{
      describe("when an error occurs in the query service ", ()=> {
        test('should return an error message', async() => {
          queryServiceStub = sinon.stub(BookController, "queryService").rejects({errCode: 404, message:"unauthorised actions"})
          await BookController.getAllBooks(req, res);
          expect(res.status.calledOnceWith(404)).toBe(true)
          expect(sendSpy.calledOnceWith({message:"unauthorised actions"})).toBe(true)
        })
      })
      describe("when an error occurs in the serializer", ()=> {
        test('should return an error message', async() => {
          queryServiceStub = sinon.stub(BookController, "serializer").throws({errCode: 404, message:"unhandle exceptions"})
          await BookController.getAllBooks(req, res);
          expect(res.status.calledOnceWith(404)).toBe(true)
          expect(sendSpy.calledOnceWith({message:"unhandle exceptions"})).toBe(true)
        })
      })
      describe("when errCode and message is not present in the error Object", ()=>{
        test("should send default error messages ", async() => {
          queryServiceStub = sinon.stub(BookController, "serializer").throws({})
          await BookController.getAllBooks(req, res);
          expect(res.status.calledOnceWith(500)).toBe(true)
          expect(sendSpy.calledOnceWith({message:"Internal error, please try again"})).toBe(true)
        })
      })
    })
  })
})