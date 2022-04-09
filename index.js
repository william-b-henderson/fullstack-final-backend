const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

require('dotenv').config();

//using free MongoDB Atlas cluster
const url = `mongodb+srv://${process.env.REACT_APP_USERNAME}:${process.env.REACT_APP_PASSWORD}@${process.env.REACT_APP_DATABASE_NAME}`;

mongoose.connect(url, { useUnifiedTopology: true, useNewUrlParser: true })

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.REACT_APP_PORT || 8080;

var router = express.Router();

router.get('/', function(req, res) {
    res.json({ message: 'Welcome to our Occasion App!' });   
});

app.use("/", router)

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "https://fullstack-final-frontend.vercel.app/"); 
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, token");
  next();
});

const occasionRouter = require('./routes/occasion.js')
app.use('/occasion', occasionRouter);

// const authRouter = require('./routes/auth.js')
// app.use('/auth', authRouter)

const userRouter = require('./routes/user.js')
app.use('/user', userRouter)


app.listen(port, (req, res) => {
    console.log(`Server Started at PORT ${port}`);
});