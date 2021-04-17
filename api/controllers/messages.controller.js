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
      user: req.body.userId.id,
      message: req.body.message.message,
      guide: req.body.guideId.id
    }
  )
    .then(message => res.status(200).json(message))
    .catch(next);

}





module.exports.checkMessages = (req, res, next) => {
  const checkId = req.user.id
  Message.find({
    $and: [

     // { read_check: 'false' },
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




module.exports.detail = (req, res, next) => {
  Message.findById(req.params.id)
    .then(guide => res.json(guide))
    .catch(next)
}


module.exports.read = (req, res, next) => {

  Message.findByIdAndUpdate({ id: req.params.id }, {read_check: true })

  console.log('aaaaaaaaaaaaaaaa')
 ///recoger el mensaje por Id y read check a true

    .then(message => res.status(200).json(message))
    .catch(next);
}
















