const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
const Guide = require('./guide.model');
const EMAIL_PATTERN = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const PASSWORD_PATTERN = /^.{8,}$/;
const PHONE_PATTERN = /\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}/;

const userSchema = new Schema({

  email: {
    type: String,
    required: 'Email is required',
    match: [EMAIL_PATTERN, 'Invalid email'],
    unique: 'You are already registered!',
    lowercase: true,
    trim: true,
  },

  password: {
    type: String,
    required: 'Password is required',
    match: [PASSWORD_PATTERN, 'Password needs at least 8 chars'], //33432179250
  },

 
  userName: {
    type: String,
    required: "Your name is required",
    unique: 'This UserName is already registered!',
    min: [5, 'Username at least need 5 characters']
  },

/*  secondFactorSecret: {
    type: String,
    required: true,
    default: () =>
      Math.random().toString(36).substr(2).slice(0,8)
  },*/

  role: {
    type: String,
    enum: ['user', 'guide'],
    default: 'user'
  },

 
  social: {
     google: String
   },


  avatar: {
    type: String,
    default: function () {
      return `https://i.pravatar.cc/150?u=${this.id}` //de moment he possat el que hi havia al cas de Christmas
    }
  },

  /*verified: {
    date: Date,
    token: {
      type: String,
      default: () =>
        Math.random().toString(36).substr(2) +
        Math.random().toString(36).substr(2) +
        Math.random().toString(36).substr(2) +
        Math.random().toString(36).substr(2) +
        Math.random().toString(36).substr(2),
    },
  },*/

  phoneNumber: {
    type: Number,
    match: [PHONE_PATTERN, 'Phone Number format must be valid'],
  },


  //resetPasswordToken: String,


  // resetPasswordExpires: Date,


}, {
  timestamps: true,
  toJSON: {
    virtuals:true,
    transform: (doc, ret) => {
      ret.id = doc._id;
      delete ret._id;
      delete ret.__v;
      delete ret.password;     
      return ret
    }
  }
});

userSchema.pre('save', function (next) {
  if (this.isModified('password')) {
    bcrypt.hash(this.password, 10).then((hash) => {
      this.password = hash;
      next();
    });
  } else {
    next();
  }
});

userSchema.methods.checkPassword = function (passwordToCheck) {
  return bcrypt.compare(passwordToCheck, this.password);
};

userSchema.virtual('guide', {
  ref: 'Guide',
  localField: '_id',
  foreignField: '_id',
  justOne: true
});



const User = mongoose.model('User', userSchema);

module.exports = User;