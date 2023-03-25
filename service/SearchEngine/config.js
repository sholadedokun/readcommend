export default  {
  rateLimiter: ()=> ({
    windowMs: 1 * 60 * 1000, // 1 minutes
    max: process.env.NODE_ENV == "test"? 2: 100, // Limit each IP to 100 requests per `window` (here, per 1 minutes)
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers}
    keyGenerator: (req, res) => {
      return req.headers["x-forwarded-for"] || req.connection.remoteAddress;
    }
  })
}