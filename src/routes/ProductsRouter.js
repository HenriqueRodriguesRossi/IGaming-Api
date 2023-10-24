const router = require("express").Router()
const checkToken = require("../utils/checkToken")
const ProductsController = require("../controllers/ProductsController")
const upload = require("../config/multer")

router.post("/products/:user_id", checkToken, upload.single("file"), ProductsController.newProduct)
router.get("/products/all", checkToken, ProductsController.findAll)
router.get("/products/:user_id", checkToken, ProductsController.findUserProducts)
router.delete("/products/:user_id/:product_id", checkToken, ProductsController.deleteProduct)
router.get("/products/:user_id/:product_id", checkToken, ProductsController.findProductById)
router.put("/products/:user_id/:product_id", checkToken, ProductsController.editProduct)

module.exports = router