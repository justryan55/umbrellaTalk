const express = require('express')
const app = express()
const port = 5000
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
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
  }))

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
            profilePictureID: "2"
        })

        const userInsert = await user.save()

        if(userInsert.errors) {
            return res.status(500).json({
                status: false,
                message: userInsert.errors,
            })
        }

        const payload = {
            name: user.name,
            email: user.email,
            password: user.password,
        }

        const secretKey = process.env.SECRET_KEY
        const token = jwt.sign(payload, secretKey, { expiresIn: '1d'} )
    
        res.status(200).json({
            message: "User is registered and logged in",
            token: token,
            userName: payload.name,
            userEmail: payload.email,
            userId: user._id,
            profilePictureID: user.profilePictureID
        })

        return res.status(200).json({
            status: true,
            message: "User registered successfully"})
    

    } catch(err) {
        return next(err)
    }
})

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
        userId: user._id,
        profilePictureID: user.profilePictureID
    })
})

app.get("/", (req, res) => {
    res.send("")
})


app.get('/api/users', async (req, res, next) => {  
    const userList = await User.find({}, 'name email _id profilePictureID')

    res.status(200).json({
        message: "Success",
        user: userList,
    })
})

app.put('/api/users/:id', async (req, res, next) => {
    const updateUsername = req.body.name
    const updateProfileImage = req.body.profilePictureID
    const userId = req.params.id

    try {
        const user = await User.findByIdAndUpdate(userId, 
        { name: updateUsername, 
            profilePictureID: updateProfileImage
         },
        { new: true } )
        res.send(user)
    } catch (err) {
        next(err)
    }

})

app.delete('/api/users/:id', async (req, res, next) => {
    const userId = req.params.id

    try {
        const user = await User.findByIdAndDelete(userId)
        res.send("Account Deleted")
    } catch (err){
        next(err)
    }
})

app.post(`/api/conversation`, async (req, res, next) => {
    try {
        const { userOne, userTwo } = req.body

        const existingConversation = await Conversation.findOne({
            $or: [
                { userOne, userTwo },
                { userOne: userTwo, userTwo: userOne}
            ]
        })

        if (existingConversation){
            res.status(200).json({
                conversationId: existingConversation._id
            })
        } else {
            const conversation = new Conversation({
                userOne: req.body.userOne,
                userTwo: req.body.userTwo,
            })
        
            const savedConversation = await conversation.save()

            res.status(200).json({
                conversationId: savedConversation._id
            })    
        }
    } catch (err) {
        next (err)
    }
})

app.get('/api/:userId/conversation', async (req, res, next ) => {
    try {
        const { userId } = req.params

        const existingConversations = await Conversation.find({
            $or: [
                { userOne: userId },
                { userTwo: userId}
            ]
        })

        const conversationIds = existingConversations.map(conversation => conversation.id)
        
        const existingMessages = await Message.find({
            conversationId: { $in: conversationIds }
        })


        const latestMessages = await Message.aggregate([
            { $match: { conversationId: { $in: conversationIds } } },
            { $sort: { createdAt: -1 } },
            { $group: {
                _id: "$conversationId",
                latestMessage: { $first: "$$ROOT" }
            }},
        ])

        const conversationWithLatestMessage = await existingConversations.map(conversation => {
            const latestMessage = latestMessages.find(message => message._id === conversation.id)

            return {
                conversation: conversation,
                latestMessage: latestMessage
            }
        } )

        res.status(200).json({
            conversation: conversationWithLatestMessage
        })

    } catch (err) {
        next (err)
    }
})

app.post('/api/conversation/:conversationId/messages', async (req, res, next) => {
    try {
        const { conversationId } = req.params
        const message = new Message({
            conversationId: req.body.conversationId,
            sender: req.body.sender,
            message: req.body.message 
        })

        const savedMessage = await message.save()

        res.status(200).json(savedMessage)
    } catch (err) {
        next (err)
    }
})

app.delete(`/api/conversation/:conversationId/messages`, async (req, res, next) => {
    
    try {
        const { conversationId } = req.params
        const deleteAllMessages = await Conversation.findByIdAndDelete(conversationId)
        res.send("Conversation deleted")
    } catch (err) {
        next(err)
    }
})


app.get(`/api/conversation/:conversationId`, async (req, res, next) => {
    try {
        const { conversationId } = req.params

        const currentConversation = await Conversation.find({
            _id: { $in: conversationId }
        }) 

        res.status(200).json(currentConversation)

        
    } catch (err) {
        next(err)
    }
})


app.put('/api/conversation/:conversationId/messages/:messageId', async (req, res, next) => {
    
    try {
        const { conversationId, messageId } = req.params
        const { message } = req.body

        const updateMessage = await Message.findByIdAndUpdate(messageId,
            { message: message },
            { new: true }
        )

        res.send(updateMessage)
    } catch (err) {
        next (err)
    }
})

app.delete('/api/conversation/:conversationId/messages/:messageId', async (req, res, next) => {
    try {
        const { conversationId, messageId } = req.params

        const deleteMessage = await Message.findByIdAndDelete(messageId)
        res.send("Message Deleted")
    } catch (err){
        next(err)
    }
})


app.get('/api/conversation/:conversationId/messages', async (req, res, next) => {
    try {
        const { conversationId } = req.params
        const messages = await Message.find({ conversationId: conversationId})
        res.status(200).json(messages)
    } catch (err) {
        next(err)
    }
})


app.listen(port, () => {
    console.log(`Umbrella Talk listening on port ${port}`)
})

connectDatabase()
