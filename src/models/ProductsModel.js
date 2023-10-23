const mongoose = require("mongoose")

const ProductsSchema = new mongoose.Schema({
	name:{
		type: String,
		required: true,
		unique: true
	},
	price:{
		type: Number,
		required: true
	},
	quantity_in_stock:{
		type: Number,
		required: true
	},
	created_at:{
		type: Date,
		default: new Date()
	}
})

module.exports = mongoose.model("Products", ProductsSchema)