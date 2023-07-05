const mongoose = require('mongoose')

const MessageSchema = mongoose.Schema({
  value: {
    type: String,
    required: true,
  },
  user: {
    type: String,
    default: "guestUser",
  },
  date: {
    type: Date,
    default: Date.now,
  },
})

module.exports = mongoose.model('Message', MessageSchema)
