const mongoose = require('mongoose');
const User = require('./user.model');
const Tour = require('./tour.model');
const Guide = require('./guide.model');
const Schema = mongoose.Schema;

const messageSchema = new Schema({

    message: {
        type: String,
        required: 'Message is required',
        minlength: [3, 'Message needs at least 3 characters']
    },

    user: {
        ref: User.modelName,
        type: mongoose.Schema.Types.ObjectId,     
    },

    tour: {
        ref: Tour.modelName,
        type: mongoose.Schema.Types.ObjectId,
     
    },

    guide: {
        ref: Guide.modelName,
        type: mongoose.Schema.Types.ObjectId,
        
    },

    read_check: {
        type: Boolean,
        default: false
    },   
       

}, { timestamps: true ,
    toJSON: {
    transform: function (doc, ret) {
      delete ret._id;
      delete ret.__v;      
      ret.id = doc.id;
      return ret;
    }
  } }
);


const Message = mongoose.model('Message', messageSchema);

module.exports = Message;
