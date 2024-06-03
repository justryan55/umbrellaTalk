const express = require('express')
const app = express()
const port = 5000;
const session = require("express-session")
const mongoose = require("mongoose")
const dotenv = require("dotenv")
const cors = require("cors")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const { body, validationResult } = require("express-validator")
const User = require("./models/User.cjs")
const Conversation = require("./models/Conversation.cjs")
const Message = require("./models/Message.cjs")


dotenv.config()
const mongoDB = process.env.MONGO_URL

const connectDatabase = async () => {
    try {
        await mongoose.connect(mongoDB)
        console.log("Connected to database")
    } catch (err) {
        console.log(err)
        process.exit(1)
    }
}

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors({
    origin: 'http://localhost:3000'
  }));

app.post("/api/auth/register", [
    body('name').trim().notEmpty().withMessage('Name is required').escape(),
    body('email').isEmail().withMessage('Invalid email').normalizeEmail(),
    body('password').isLength({min: 5}).withMessage('Password must be at least 5 characters long').escape()
], async (req, res, next) => {

    const errors = validationResult(req)

    if (!errors.isEmpty()){
        return res.status(400).json({ 
            errors: errors.array() 
        })
    } 

    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10)

        const user = new User({
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword,
        });

        const userInsert = await user.save();

        if(userInsert.errors) {
            return res.status(500).json({
                status: false,
                message: userInsert.errors,
            });
        }

        return res.status(200).json({
            status: true,
            message: "User registered successfully"})
    

    } catch(err) {
        return next(err)
    }
});

app.post('/api/auth/login', async (req, res, next) => {
    const { email, password } = req.body

    const user = await User.findOne( { email })

    if (!user){
        return res.status(401).send("Invalid email")
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password)

    if (!isPasswordCorrect){
        return res.status(401).send("Invalid password")
    }

    const secretKey = process.env.SECRET_KEY

    const payload = {
        name: user.name,
        email: user.email,
        password: user.password,
    }

    const token = jwt.sign(payload, secretKey, { expiresIn: '1d'} )

    res.status(200).json({
        message: "User is logged in",
        token: token,
        userName: payload.name,
        userEmail: payload.email,
        userId: user._id
    })
})

app.get("/", (req, res) => {
    res.send("")
})


app.get('/api/users', async (req, res, next) => {
    const userList = await User.find({}, 'name email')

    res.status(200).json({
        message: "Success",
        user: userList,
    })
})

app.post(`/api/conversation`, async (req, res, next) => {
    const conversation = new Conversation({
        userOne: req.body.userOne,
        userTwo: req.body.userTwo,
    })

    const savedConversation = await conversation.save()

    res.status(200).json({
        conversationIdObject: savedConversation._id
    })
})




app.listen(port, () => {
    console.log(`Umbrella Talk listening on port ${port}`)
})

connectDatabase()