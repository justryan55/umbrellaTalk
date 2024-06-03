const mongoose = require('mongoose')
const Schema = mongoose.Schema

const conversationSchema = new Schema({
    userOne: { type: String },
    userTwo: { type: String },
}, {timestamps: true})

const Conversation = mongoose.model('Conversation', conversationSchema)

module.exports = Conversation 