const router = require("express").Router()
const UserController = require("../controllers/UserController")
const checkToken = require("../utils/checkToken")

router.post("/users/register", UserController.newUser)
router.post("/users/login", UserController.login)
router.get("/users/all",checkToken, UserController.findAll)
router.get("/users/:user_id", checkToken, UserController.findUser)

module.exports = router