const mongoose = require('mongoose');
//const validator = require('validator');

//Create Scheme or Database
const userSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		min: 6
	},
	email: {
		type: String,
		required: true,
		max: 255,
		min: 6
		// validate(value) {
		// 	if (!validator.isEmail(value)) {
		// 		throw new Error('Invalid Email');
		// 	}
		// }
	},
	password: {
		type: String,
		required: true,
		min: 6
	},
	date: {
		type: Date,
		default: Date.now
	}
});

module.exports = mongoose.model('User', userSchema);
