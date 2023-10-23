const router = require("express").Router()

router.post("/users/register")
router.get("/users/all")
router.get("/users/:user_id")
router.post("/users/login")

module.exports = router