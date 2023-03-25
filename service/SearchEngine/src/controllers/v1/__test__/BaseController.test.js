import BaseController from "../BaseController.js";

describe("Sanitising input", ()=>{
  const {MAX_PAGES, MAX_YEAR, MIN_PAGES, MIN_YEAR} = BaseController.DEFAULT_VAL_RANGES()
  const validQueries =  [
    {
      value:{
        limit: "3",
        authors:"23,45,656",
        genres:"234,453,656",
        "min-pages": MIN_PAGES,
        "max-pages": MAX_PAGES,
        "max-year": MAX_YEAR,
        "min-year": MIN_YEAR,
      },
      expected:{
        limit: "3",
        authors:"23,45,656",
        genres:"234,453,656",
        "min-pages": MIN_PAGES,
        "max-pages": MAX_PAGES,
        "max-year": MAX_YEAR,
        "min-year": MIN_YEAR,
      }
    }]
  const invalidQueries = [
    { value:{limit: "b"} },
    { value:{authors: "3:3"} },
    { value:{authors: "3,3;4"}},
    { value:{genres: ":3;4"}},
    { value:{"min-pages": MIN_PAGES - 1} },
    { value:{"max-pages":  MAX_PAGES + 1}},
    { value:{"min-year": MIN_YEAR - 1} },
    { value:{"max-year":  MAX_YEAR + 1}},
    { value:{limit: "2", authors: "3:3"} },
    { value:{limit: "2", authors: "33", "min-pages": MIN_PAGES - 1} },
  
  ]

  test("should not change value for the valid inputs", ()=>{
    validQueries.forEach((query)=>{
      const validatedQuery = BaseController.sanitiseInput(query.value)
      expect(validatedQuery).toEqual(query.expected)
    })
  })
  
  test.each(invalidQueries)("invalid inputs", ({query})=>{
    expect(()=>{        
      BaseController.sanitiseInput(query.value)
    }).toThrow()
  })
})