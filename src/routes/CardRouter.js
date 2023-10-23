const router = require("express").Router()
const checkToken = require("../utils/checkToken")

router.post("/carts/:user_id", checkToken,)
router.get("/carts/:user_id", checkToken,)
router.get("/carts/:user_id/:cart_id", checkToken,)

module.exports = router