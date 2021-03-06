const passport = require('passport');
const mongoose = require('mongoose');
const createError = require('http-errors');
const User = require('../models/user.model');
const LocalStrategy = require('passport-local').Strategy;
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;


passport.serializeUser((user, next) => {
  next(null, user.id);
});

passport.deserializeUser((id, next) => {
  User.findById(id)  
    .populate('guide')
    .then(user => next(null, user))
    .catch(next);
});



/// A VALORAR SI VALIDAR CON CORREO //


passport.use('local-auth', new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password'
}, (email, password, next) => {
  User.findOne({ email })
    .populate('guide')
     .then(user => {
      if (!user) {
        next(null, null, { email: 'Invalid email or password'})
      } else {
        return user.checkPassword(password)
        
          .then(match => {
            if (match) {
              next(null, user)
            } else {
              next(null, null, { email: 'Invalid email or password' })
            }
          })
      }
    }).catch(next)
}));


passport.use('google-auth', new GoogleStrategy({
  clientID: process.env.G_CLIENT_ID,
  clientSecret: process.env.G_CLIENT_SECRET,
  callbackURL: '/api/authenticate/google/ghunter',
}, (accessToken, refreshToken, profile, next) => {

  const googleId = profile.id;
  const userName = profile.displayName;
  const email = profile.emails[0] ? profile.emails[0].value : undefined;
  const avatar = profile.photos[0] ? profile.photos[0].value : undefined;

  if (googleId && userName && email) {
    User.findOne({
        $or: [{
            email
          },
          {
            'social.google': googleId
          }
        ]
      })
      .then(user => {
        if (!user) {
          user = new User({
            userName,
            email,
            avatar,
            password: mongoose.Types.ObjectId(),
            social: {
              google: googleId
            },
            verified: {
              date: new Date(),
              token: null
            }
          });
          return user.save()          
            .then(user => {
              next(null, user)
            }
            )
        } else {
          next(null, user);
        }
      }).catch(next)
  } else {
    next(null, null, {
      oauth: 'invalid google oauth response'
    })
  }
}));