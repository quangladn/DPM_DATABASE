const express = require("express")
const router = express.Router()
const fs = require("fs")
const { v4:uuidv4 } = require("uuid")

const rawData = fs.readFileSync("./api/data.json",{encoding:"utf-8"}).toString()
let data = JSON.parse(rawData)

console.log(data)

router.get("/pack/__/all",(rep,res) => {
  const show = []
  for (let i=0;i<data.length;i++)
  {
    show.push({"name":data[i]["name"],"description":data[i]["description"],"downloaded":data[i]["downloaded"]})
  }
  res.send(show)
})
router.post("/pack/post",(rep,res) => {
  const foundPackage = data.find((d) => d.name === rep.body.name)
  if (foundPackage)
  {
    res.send("database has package name like your package name.")
  }
  else {
    const keyUpdate = uuidv4()
    data.push({...rep.body,key:keyUpdate,downloaded:0})
    fs.writeFileSync("./api/data.json",JSON.stringify(data),{encoding:"utf-8"})
    console.log(keyUpdate)
    res.send(`success! key update: ${keyUpdate}`)
  }
})
router.get("/pack/__/:name",(rep,res) => {
  const pack = data.find((d) => d.name == rep.params.name)
  //res.send({pack["name"],pack["code"]})
  res.send(`${pack["name"]},${pack["description"]}`)
})
router.get("/pack/:name",(rep,res) => {
  const pack = data.find((d) => d.name == rep.params.name)
  //res.send({pack["name"],pack["code"]})
  res.send(`${pack["name"]},${pack["code"]}`)
})
router.get("/pack/updownload/:name",(rep,res) => {
  const pack = data.find((d) => d.name == rep.params.name)
  //res.send({pack["name"],pack["code"]})
  pack["downloaded"] ++
  res.send(`${pack["name"]},${pack["code"]}`)
})
router.get("/pack/download/:name",(rep,res) => {
  if (rep.params.name != "all")
  {
    const pack = data.find((d) => d.name == rep.params.name)
    //res.send({pack["name"],pack["code"]})
    res.send(pack["downloaded"])
  } else if (rep.params.name == "all") {
    const show = []
    for (let i=0;i<data.length;i++)
    {
      // show.push({"downloaded":data[i]["downloaded"]})
      show.push({"name":data[i]["name"],"download":data[i]["downloaded"]})
    }
    res.send(show)
  }
})
router.post("/pack/delete/:name/:key",(rep,res) => {
  const k = data.find((d) => d.name == rep.params.name)
  if (k["key"] == rep.params.key)
  {

  data = data.filter((d) => d.name != rep.params.name )
  fs.writeFileSync("./api/data.json",JSON.stringify(data),{encoding:"utf-8"})
  res.send("success")
  } else {
    res.send("key error")
  }
})
//router.get("/pack/te123/:name/:key",(rep,res)=>{
router.post("/pack/:name/:key",(rep,res)=>{
  const name = rep.params.name
  const key = rep.params.key
  const ud = data.find((d) => d.name === name)
  console.log(rep.body.code)
  console.log(rep.body.description)
  if (ud["key"] == key)
  {
    if (rep.body.code)
    {

      ud["code"] = rep.body.code
    }
    if (rep.body.description)
    {

      ud["description"] = rep.body.description
    }
    fs.writeFileSync("./api/data.json",JSON.stringify(data),{encoding:"utf-8"})
    res.send("update success")
  }
  else 
  {
    res.send("key error")
  }
})
module.exports = router

