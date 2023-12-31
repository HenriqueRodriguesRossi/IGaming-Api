const mongoose = require("mongoose")

const CardSchema = new mongoose.Schema({
	user_id:{
		type: String,
		required: true
	},
	id_game:{
		type: String,
		required: true
	},
	amount:{
		type: Number,
		required: true
	},
	total_price: {
		type: Number,
		required: false
	},
	id_user:{
		type: mongoose.Schema.Types.ObjectId,
        ref: "User"
	},
	id_game:{
		type: mongoose.Schema.Types.ObjectId,
        ref: "Products"
	},
	created_at: {
		type: Date,
		default: new Date()
	}
})

module.exports = mongoose.model("Card", CardSchema)