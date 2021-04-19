const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = require('./user.model');
const EMAIL_PATTERN = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const PHONE_PATTERN = /\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}/;

const guideSchema = new Schema({

  

  name: {
    type: String,
    required: 'Name is required',
    minLength: [3, 'Name needs at least 5 characters'],
    trim: true,
  },

  surname: {
    type: String,
    required: 'Surname is required',
    minLength: [3, 'Surname needs at least 5 characters'],
    trim: true,
  },

  guideLicense: {
    type: Number,
    required: 'Guide license is required',
  },

  email: {
    type: String,
    required: 'Email is required',
    match: [EMAIL_PATTERN, 'Invalid email'],
    unique: 'You are already registered!',
    lowercase: true,
    trim: true,
  },
 

  phoneNumber: {
    type: Number,
    match: [PHONE_PATTERN, 'Phone Number format must be valid'],
  },

  
    avatar: {
    type: String,
    required: 'Image is required',
    validate: {
      validator: function (value) {
        try {
          const url = new URL(value);
          return url.protocol === 'http:' || url.protocol === 'https:'
        } catch (error) {
          return false;
        }
      },
      message: props => `Invalid image URL`
    }
  },

  languages: [String], 


  experience: {
    type: String,
    required: 'Explain your experience is required',
    minLength: [10, 'Description needs at least 10 characters']
  },


  images:
  [
      {
          type: String,                     
      },      
  
  ],

  
  city: {
    type: String,
  },

  country: {
    type: String,
  },

  ratingsGuide: {
    type: Number,
    min: [1, 'Rating min is 1.0'],
    max: [5, 'Rating max is 5.0']
},
ratingsNumber: {
    type: Number,
    default: 0,
},

user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
},  

tour: {
  type: mongoose.Schema.Types.ObjectId,
  ref: 'Tour'
},


}, {
  timestamps: true,
  toJSON: {
    transform: function (doc, ret) {
      delete ret._id;
      delete ret.__v;
      delete ret.password;
      ret.id = doc._id;
      return ret;
    }
  } 
});




const Guide = mongoose.model('Guide', guideSchema);
module.exports = Guide;