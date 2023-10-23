const mongoose = require("mongoose")

const CardSchema = new mongoose.Schema({
	id_user:{
		type: String,
		required: true
	},
	id_game:{
		type: String,
		required: true
	},
	created_at: {
		type: Date,
		default: new Date()
	}
})

module.exports = mongoose.model("Card", CardSchema)