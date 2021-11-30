const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose')

//using free MongoDB Atlas cluster
const url = "mongodb+srv://admin:test@webdev-final-project-oc.ccygp.mongodb.net/user-auth-db?retryWrites=true&w=majority" 

mongoose.connect(url, { useUnifiedTopology: true, useNewUrlParser: true })

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;

var router = express.Router();

router.get('/', function(req, res) {
    res.json({ message: 'Welcome to our Occasion App!' });   
});

app.use("/", router)

const occasionRouter = require('./routes/occasion.js')
app.use('/events', occasionRouter);

const authRouter = require('./routes/auth.js')
app.use('/auth', authRouter)

const userRouter = require('./routes/user.js')
app.use('/user', userRouter)


app.listen(port, (req, res) => {
    console.log(`Server Started at PORT ${port}`);
});