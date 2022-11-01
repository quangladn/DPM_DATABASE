const express = require("express")
const app = express()
const package = require("./api/package.js")
const body_parse = require("body-parser")

app.use(body_parse.json())
app.use(express.urlencoded())

app.use("/",package)

app.get("/",(rep,res) => {
  res.sendFile(__dirname+"/client/index.html")
})
app.get("/create",(rep,res) => {
  res.sendFile(__dirname+"/client/create.html")
})
app.get("/show",(rep,res) => {
  res.sendFile(__dirname+"/client/show.html")
})
app.get("/edit",(rep,res) => {
  res.sendFile(__dirname+"/client/edit.html")
})
app.get("/delete",(rep,res) => {
  res.sendFile(__dirname+"/client/index.html")
})


const port = process.env.PORT || 3000
app.listen(port,() => console.log(port))







