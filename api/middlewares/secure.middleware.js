const createError = require('http-errors');

module.exports.isAuthenticated = (req, res, next) => {
  
  if (req.isAuthenticated()) {
    next();
  } else {
    next(createError(401, 'Sorry you are not authenticated'))
  }
};
/*
module.exports.isAuthenticated = (req, res, next) => {
  //if (req.isAuthenticated() && req.session.secondFactor) { disable 2FA ;)
  if (req.isAuthenticated() && req.session.secondFactor()) {
    next();
  } else {
    next(createError(401, 'Sorry you are not authenticated'))
  }
};*/