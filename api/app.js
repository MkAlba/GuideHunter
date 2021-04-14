require('dotenv').config(); //uso del env

const mongoose = require('mongoose');
const createError = require('http-errors');
const logger = require('morgan');
const express = require('express');
const passport = require('passport');


require('./config/passport.config');
require('./config/db.config');
const cors = require('./config/cors.config');
const session = require('./config/session.config');

const app = express();

app.use(express.static(`${__dirname}/react-app`))


/** Middlewares */
app.use(express.json());  //decimos a servidor que llega json
app.use(logger('dev')); //decimos que logue todas las peticiones
app.use(session);
app.use(cors); //permite que desde el 3000 se hagan consultas a la base de datos
app.use(passport.initialize());
app.use(passport.session());




/** Configure routes */
const router = require('./config/routes.config');

/*app.use((req, res, next) => {      una manera de autenticar a través de params

  if(req.query.api_key === 'hkhalskduo4iweyrihebflkw5ehfeihf') {
    return next()
  } 
  next(createError(401, 'Unauthorized'))

})*/


app.use('/api', router)
app.get('/*', (req, res)=> {
  res.sendFile(`${__dirname}/react-app/index.html`)
})

/** Handle Errors */

//




app.use((error, req, res, next) => {
//centralizamos todos los errores en el app.js de la api porque los req de los controlaadores devuelvern jsons y es más fácil manjerlos todos desde aquí

if (error instanceof mongoose.Error.ValidationError) error = createError(400, error)
else if (error instanceof mongoose.Error.CastError) error = createError(404, 'Resource not found')
else if (error.message.includes('E11000')) error = createError(400, 'Already exists')

  console.error(error);

  const data = {}
  data.message = error.message;
  // esto define y limita el json de errores como quieres que lo envie a react
  data.errors = error.errors ? 
  Object.keys(error.errors)
    .reduce((errors, key) => ({ ...errors, [key]: error.errors[key]?.message || error.errors[key] }), {}) :
  undefined;

res.status(error.status || 500).json(data)
});




const port = Number(process.env.PORT || 3001);
app.listen(port, () => {
  console.log(`Ready! Listen on port ${port}`);
})

module.exports = app
