const router = require('express').Router();
const User = require('../model/User');
const { register, login } = require('../validation');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

//Register
router.post('/register', async (req, res) => {
	// Lets validate the data before make a user
	const { error } = register(req.body);
	if (error) return res.status(400).json(error.details);

	// Checking is the user is already in dataBase
	const emailExist = await User.findOne({ email: req.body.email });
	if (emailExist)
		return res
			.status(400)
			.send([
				{ message: 'Email is already exist', path: [ 'email' ], context: { label: 'email already exist' } }
			]);

	//Hash the password
	const salt = await bcrypt.genSalt(10);
	const hashPassword = await bcrypt.hash(req.body.password, salt);

	//Create a new user
	const user = new User({
		name: req.body.name,
		email: req.body.email,
		password: hashPassword
	});
	try {
		const savedUser = await user.save();
		console.log('Register');
		res.send([
			{
				message: 'Registration Sucessfully',
				path: [ 'register' ],
				context: { label: 'Registration Sucessfully' }
			}
		]);
	} catch (err) {
		res.status(400).send(err);
	}
});

//LOGIN

router.post('/login', async (req, res) => {
	// Checking the validation for login
	const { error } = login(req.body);
	if (error) return res.status(400).send(error.details[0].message);

	// Checking the email exists
	const userEmail = await User.findOne({ email: req.body.email });
	if (!userEmail) return res.status(400).send('Email is not found ');

	// Checking the password
	//res.body.password call the input & userEmail.password call the hash password

	const validPass = await bcrypt.compare(req.body.password, userEmail.password);
	if (!validPass) return res.status(400).send('Invalid Password');

	//create and assign a token
	const token = jwt.sign({ _id: userEmail._id }, process.env.TOKEN_SECRET);
	res.header('auth_token', token).send(token);
});

//Export
module.exports = router;
