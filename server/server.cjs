const express = require('express')
const app = express()
const port = 5000;
const path = require("path")
const session = require("express-session")
const passport = require("passport")
const LocalStrategy = require("passport-local").Strategy
const mongoose = require("mongoose")
const dotenv = require("dotenv")
const User = require("./models/User.cjs")
const cors = require("cors")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const { body, validationResult } = require("express-validator");


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

    const token = jwt.sign(payload, secretKey, { expiresIn: '60'} )

    res.status(200).json({
        message: "User is logged in",
        token: token
    })
})

app.get("/", (req, res) => {
    res.send("")
})

app.listen(port, () => {
    console.log(`Umbrella Talk listening on port ${port}`)
})

connectDatabase()