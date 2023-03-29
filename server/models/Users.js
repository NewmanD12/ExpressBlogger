const mongoose = require('mongoose')
const { v4: uuidv4 } = require('uuid')

const userSchema = new mongoose.Schema({
    email: String,
    password: String,
    id: {type: String, default: uuidv4},
    createdAt: { type: Date, default: Date.now }
})

const User = mongoose.model("users", userSchema)

module.exports = User