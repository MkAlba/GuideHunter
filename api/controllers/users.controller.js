const User = require('../models/user.model')
const createError = require('http-errors')
const passport = require('passport')
const totp = require('totp-generator')



module.exports.register = (req, res, next) => {
  User.findOne({
    email: req.body.email
  })
    .then((user) => {
      if (user) {
        next(createError(404, { errors: { email: 'Mail already registered' } }))
      } else {
        console.log(req.body)
        return User.create(req.body).then((user => res.status(201).json(user)));
      };
    }
    )
    .catch(next)
}


/*module.exports.totp = (req, res, next) => {
  if (!req.isAuthenticated()) {
      return next(createError(401, 'user is not authenticated'))
  }

  if (totp(req.user.secondFactorSecret) === req.body.totp) {
      req.session.secondFactor = true
      return res.json(req.user)
  }

  next(createError(400, 'Invalid TOTP'))
}*/


module.exports.login = (req, res, next) => {
  passport.authenticate('local-auth', (error, user, validations) => {
    
    if (error) {
      next(error);
    } else if (!user) {
      next(createError(400, 'Invalid credentials'))
    } else {
      
      req.login(user, error => {
        
        console.log(user)
        if (error) next(error)
        else res.json(user)
      })
    }
  })(req, res, next);
};

module.exports.loginWithGoogle = (req, res, next) => {
  const passportController = passport.authenticate('google-auth', (error, user, validations) => {
    if (error) {
      next(error);
    } else {
      req.login(user, error => {
        if (error) next(error)

        else
          res.redirect(`${process.env.WEB_URL}/authenticate/google/ghunter`)


      })
    }
  })
  passportController(req, res, next);
}

module.exports.logout = (req, res, next) => {
  req.logout();

  res.status(204).end()
}



module.exports.list = (req, res, next) => {
  const criteria = {}

  if (req.query.name) {
    criteria.name = req.query.name
  }
  User.find(criteria) //no hay criterio de busqueda
    .then(users => res.status(200).json(users)) //recojo todos los eventos y lo devuelvo
    .catch(next)
}



module.exports.detail = (req, res, next) => {

  if(req.params.id === 'me') {
    return res.json(req.user)
  }
  
  User.findById(req.params.id)
    .populate('guide')
    .then(user => res.status(200).json(user))
    .catch(next)
}



module.exports.update = (req, res, next) => {




  
  User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true }) //con run queremos que antes de guarlardlo en base de datos ejecute los validadores de mongoose
    .then(user => {
      if (user) res.status(201).json(user)
      else next(createError(404, 'User not found'))
    })
    .catch(next)
}


module.exports.delete = (req, res, next) => {
  User.findByIdAndDelete(req.params.id)
    .then(user => {
      if (user) res.status(204).json({})
      else next(createError(404, 'User not found'))
    })
    .catch(next)
}











