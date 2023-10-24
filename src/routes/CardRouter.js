const router = require("express").Router()
const checkToken = require("../utils/checkToken")
const CardController = require("../controllers/CardsController")

router.post("/cards/:user_id", checkToken, CardController.newCard)
router.get("/cards/:user_id", checkToken, CardController.findAllCards)
router.get("/cards/:user_id/:card_id", checkToken, CardController.findCard)

module.exports = router