import request from 'supertest'
import app from "./app"
import config from './config.js'

describe("rate limiting", ()=>{
  // debugger

  beforeEach(()=>{
    jest.useFakeTimers()
  })
  
  test("should allow a request that is below the set rate", async()=>{
    const response = await request(app).get("/").set('Remote-Addr', '192.168.2.1')
    expect(response.statusCode).not.toBe(429)
  })
  test("should allow a request that is at the set rate", async()=>{
    await request(app).get("/").set('X-Forwarded-For', '192.168.2.67')
    const response = await request(app).get("/").set('X-Forwarded-For', '192.168.2.67')
    expect(response.statusCode).not.toBe(429)
  })
  test("should deny a request that is above the set rate", async()=>{
    await request(app).get("/").set('X-Forwarded-For', '192.168.2.2')
    await request(app).get("/").set('X-Forwarded-For', '192.168.2.2')
    const response = await request(app).get("/").set('X-Forwarded-For', '192.168.2.2')
    expect(response.statusCode).toBe(429)
  })
  xtest("should allow a request that is previously denied in the next Window cycle", async()=>{
    await request(app).get("/").set('X-Forwarded-For', '112.168.2.2')
    await request(app).get("/").set('X-Forwarded-For', '112.168.2.2')
    const response = await request(app).get("/").set('X-Forwarded-For', '112.168.2.2')
    expect(response.statusCode).toBe(429)

    //time travel to set next window period.
    const nextWindowTime = new Date(Date.now() + config.rateLimiter().windowMs).valueOf();
    global.Date.now = jest.fn(() => nextWindowTime );
    const newResponse = await request(app).get("/").set('X-Forwarded-For', '112.168.2.2')
    expect(newResponse.statusCode).not.toBe(429)
  })
})

describe("/api", ()=> {
  describe("/api/v1", ()=> {
    describe("/api/v1/books", ()=> {
      test("should respond with a 200 status code", async()=> {
        const response = await request(app)
          .get("/api/v1/books")
          .set('X-Forwarded-For', '192.168.2.1')
          .set('Accept', 'application/json')
        expect(response.statusCode).toBe(200)
      })
    })

    describe("Invalid /api/v1 routes", ()=> {
      test("should respond with a 404 status code", async()=> {
        const response = await request(app)
          .get("/api/v1/bookes")
          .set('X-Forwarded-For', '192.168.3.1')
          .set('Accept', 'application/json')
        expect(response.statusCode).toBe(404)
      })
    })
  })

  describe("Invalid /api routes", ()=> {
    test("should respond with a 404 status code", async()=> {
      const response = await request(app)
        .get("/api/v2/books")
        .set('X-Forwarded-For', '192.168.2.4')
      expect(response.statusCode).toBe(404)
    })
  })
})

describe("Invalid app routes", ()=> {
  test("should respond with a 404 status code", async()=> {
    const response = await request(app).get("/route/v1/books")
      .set('X-Forwarded-For', '192.168.2.4')
    expect(response.statusCode).toBe(404)
  })
})