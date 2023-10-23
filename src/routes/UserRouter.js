const router = require("express").Router()
const UserController = require("../controllers/UserController")

router.post("/users/register", UserController.newUser)
router.get("/users/all", UserController.findAll)
router.get("/users/:user_id", UserController.findUser)
router.post("/users/login", UserController.login)

module.exports = router