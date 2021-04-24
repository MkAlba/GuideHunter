const User = require('../models/user.model');
const Guide = require('../models/guide.model');
const mongoose = require('mongoose');
const Tour = require('../models/tour.model');
const Message = require('../models/message.model');
const Talk = require('../models/talk.model');
const mailer = require('../config/mailer.config');



// NEW MESSAGE
module.exports.message = (req, res, next) => {

  Message.create(
    {
      user: (req.body.userId.id || req.user.id), //he añadido el req.user.id porque al contestar desde guia me lo enviaba undefined
      message: req.body.message.message,
      guide: req.body.guideId.id
    }
  )
    .then(message => res.status(200).json(message))
    .catch(next);

}


module.exports.oneMessage = (req, res, next) => {

  const userId = req.user.id

    Message.findOne({
    $and: [  
  
      { read_check: 'false' },
      { $or: [{ guide: userId }] }
    ]
  })
    .then(message => {

      if (message) res.json(true)
      else res.json(false)
    })

    .catch(next)
}


module.exports.checkMessages = (req, res, next) => {
  const checkId = req.user.id
  
  Message.find({
    $and: [

      { read_check: 'false' },
       { $or: [{ guide: checkId }, { user: checkId }] }
    ]
  })
    .populate('user tour guide')
    .then(messages => {
      const conversations = messages.reduce((conversations, message) => {      
        const user = message.user.id === checkId ? message.guide : message.user;
        if (conversations[user.id]) {
          conversations[user.id].messages.push(message)
        } else {
          conversations[user.id] = {
            id: user.id,
            user: user,
            messages: [
              message
            ]
          }
        }
        return conversations;
      }, {})

      res.status(201).json(Object.values(conversations))
     

    })
    .catch(next)
}



module.exports.readCheck = (req, res, next) => {

 
  Message.findByIdAndUpdate({ _id: req.params.id }, { read_check: true })

    .then(message => res.status(200).json(message))
    .catch(next);
}


