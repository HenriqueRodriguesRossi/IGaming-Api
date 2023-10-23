const express = require("express")
const app = express()
const bodyParser = require("body-parser")
const cors = require("cors")
require("dotenv").config()
require("./connect/connect.js")

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(cors())

const userRouter = require("./routes/UserRouter.js")
app.use(userRouter)

app.listen(8080, ()=>{
    console.log("Servidor rodando na porta 8080!")
})