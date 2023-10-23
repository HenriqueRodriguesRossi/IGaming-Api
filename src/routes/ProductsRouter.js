const router = require("express").Router()

router.post("/products/:user_id")
router.get("/products/all")
router.get("/products/:user_id")
router.delete("/products/:user_id/:product_id")
router.get("/products/:user_id/:product_id")
router.put("/products/:user_id/:product_id")

module.exports = router