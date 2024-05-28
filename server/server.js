const express = require('express')
const app = express()
const port = 5000;
const path = require("path")
const session = require("express-session")
const passport = require("passport")
const LocalStrategy = require("passport-local").Strategy
const mongoose = require("mongoose")
const dotenv = require("dotenv")
const User = require("./models/User")


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

app.post("/api/auth/register", async (req, res, next) => {
    try {
        const user = new User({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        })
        const result = await user.save()
    } catch(err) {
        return next(err)
    }
})

app.get("/", (req, res) => {
    res.send("")
})

app.listen(port, () => {
    console.log(`Umbrella Talk listening on port ${port}`)
})

connectDatabase()