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

app.post("/api/auth/register", async (req, res, next) => {
    try {
        const user = new User({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        });

        const userInsert = await user.save();

        if(userInsert.errors) {
            return res.send({
                'status': false,
                'message': userInsert.errors,
            });
        }


        // log in the user
           
        
        return res.send({
            'status': true,
            'message': 'user registered',
        });

        

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