const express = require("express")
const app = express()
const bodyParser = require("body-parser")
const cors = require("cors")
require("dotenv").config()
require("./database/connect.js")

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(cors())

const userRouter = require("./routes/UserRouter.js")
app.use(userRouter)

const ProductsRouter = require("./routes/ProductsRouter.js")
app.use(ProductsRouter)

const CardRouter = require("./routes/CardRouter.js")
app.use(CardRouter)

app.listen(8080, ()=>{
    console.log("Servidor rodando na porta 8080!")
})