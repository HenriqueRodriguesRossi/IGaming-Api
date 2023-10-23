const router = require("express").Router()

router.post("/carts/:user_id")
router.get("/carts/:user_id")
router.get("/carts/:user_id/:cart_id")

module.exports = router