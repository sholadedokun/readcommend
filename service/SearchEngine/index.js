const express = require("express");
const BodyParser  = require("body-parser")
const cors  = require("cors")

const app = express()
app.use(express.urlencoded({ extended: false }));
app.use(BodyParser.json())
app.use(cors())

const api = require("./src/routes/api")
app.use("/api", api)
app.use('*', function (req, res) {
  res.status(404).json({ body: "invalid route" })
})

app.listen(5001, (err) => {
  if(err){
    console.log(err, "Starting SearchEngine")
  }
  else{
    console.log("SearchEngine service started on :5001")
  }
})