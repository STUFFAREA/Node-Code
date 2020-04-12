const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

//Import the router
const authRouter = require('./routes/auth');
const postRouter = require('./routes/posts');

//Create Enviroment
//.env config
dotenv.config();

//Connection with DB

mongoose.connect(
	process.env.DB_CONNECT,
	{
		useUnifiedTopology: true,
		useNewUrlParser: true
	},
	() => console.log('connect to db')
);

//Middlewares
app.use(express.json());
app.use(cors());

//Route Middleware
//"api/user/register"
app.use('/api/user', authRouter);
app.use('/api/post', postRouter);

app.listen(3000, () => console.log('Server is start'));
