import app from "./app.js"

app.listen(5001, (err) => {
  if(err){
    console.log(err, "Starting SearchEngine")
  }
  else{
    console.log("SearchEngine service started on :5001")
  }
})