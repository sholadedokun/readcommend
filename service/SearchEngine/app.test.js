import request from 'supertest'
import app from "./app"

describe("/api", ()=> {

  describe("/api/v1", ()=> {

    describe("/api/v1/books", ()=> {
      test("should respond with a 200 status code", async()=> {
        const response = await request(app).get("/api/v1/books")
        expect(response.statusCode).toBe(200)
      })
    })

    describe("Invalid /api/v1 routes", ()=> {
      test("should respond with a 404 status code", async()=> {
        const response = await request(app).get("/api/v1/bookes")
        expect(response.statusCode).toBe(404)
      })
    })
  })

  describe("Invalid /api routes", ()=> {
    test("should respond with a 404 status code", async()=> {
      const response = await request(app).get("/api/v2/books")
      expect(response.statusCode).toBe(404)
    })
  })
})

describe("Invalid app routes", ()=> {
  test("should respond with a 404 status code", async()=> {
    const response = await request(app).get("/route/v1/books")
    expect(response.statusCode).toBe(404)
  })
})