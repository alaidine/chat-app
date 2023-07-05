const express = require('express')
const router = express.Router()
const Message = require('../models/Message')

router.get('/get_messages', async (req, res) => {
  try {
    const messages = await Message.find()
    res.json(messages)
  } catch(err) {
    res.json({ message: err })
  }
})

router.post('/post_message', async (req,res) => {
  const message = new Message({
    value: req.body.value,
  })

  try {
    const savedMessage = await message.save()
    res.json(savedMessage)
  } catch (err) {
    res.json({ message: err })
  }
})

module.exports = router
