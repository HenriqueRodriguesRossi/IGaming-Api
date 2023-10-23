const router = require("express").Router()
const checkToken = require("../utils/checkToken")
const ProductsController = require("../controllers/ProductsController")

router.post("/products/:user_id", checkToken, ProductsController.newProduct)
router.get("/products/all", checkToken, ProductsController.findAll)
router.get("/products/:user_id", checkToken,)
router.delete("/products/:user_id/:product_id", checkToken,)
router.get("/products/:user_id/:product_id", checkToken,)
router.put("/products/:user_id/:product_id", checkToken,)

module.exports = router