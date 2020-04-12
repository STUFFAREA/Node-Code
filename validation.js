//Validation
const Joi = require('@hapi/joi');
//Register Validation

const register = (data) => {
	const schema = Joi.object({
		name: Joi.string().min(4).required().label('Name is too short'),
		email: Joi.string().min(6).required().email().label('Email is invalid'),
		password: Joi.string().min(6).required().label('Password too short')
	});
	return schema.validate(data, { abortEarly: false });
};

const login = (data) => {
	const schema = Joi.object({
		email: Joi.string().min(6).required().email(),
		password: Joi.string().min(6).required()
	});
	return schema.validate(data);
};

module.exports.register = register;
module.exports.login = login;
