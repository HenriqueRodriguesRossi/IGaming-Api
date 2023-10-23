const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({
	full_name:{
		type: String,
		required: true
	},
	cpf:{
		type: String,
		required: true,
		unique: true
	},
	email:{
		type: String,
		required: true,
		unique: true,
		lowercase: true
	},
	password:{
		type: String,
		required: true
	},
	created_at:{
		type: Date,
		default: new Date()
	}
}),

module.exports = mongoose.model("User", UserSchema)