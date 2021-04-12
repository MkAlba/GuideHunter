const Guide = require('../models/guide.model');
const createError = require('http-errors');
const passport = require('passport');



module.exports.list = (req, res, next) => {

   const criteria = {}
  const { search } = req.query;
  console.log(req.query)

  
  if (search) {
    criteria.name = new RegExp(search, 'i');
    criteria.languages = new RegExp(search, 'i');
    console.log(criteria.languages)
    
  }
    Guide.find(criteria) 
    
    .then(guides => {
        console.log(guides)
        res.status(200).json(guides)}) //recojo todos los eventos y lo devuelvo
    .catch(next)
}


module.exports.detail = (req, res, next) => { 
    Guide.findById(req.params.id)
    .then(guide => res.json(guide))
    .catch(next)    
}




module.exports.create = (req, res, next) => {


    if(req.file) {
        req.body.avatar = req.file.url
    }

    
    console.log(req.body)
    console.log(req.user)

    req.body._id = req.user.id

    Guide.create(req.body)
    
        .then(guide => {
            req.user.role = 'guide'
            return req.user.save() //en mongoose no se popula con save
                    .then(user => user.populate('guide').execPopulate())
                    .then(user => res.status(201).json(user))
                    
        })
        .catch(next)
    
}


module.exports.delete = (req, res, next) => {

    if(req.file) {
        req.body.avatar = req.file.url
    }
    
    Guide.findByIdAndDelete(req.params.id)
        .then(guide => {
            if(guide) res.status(204).json({})
            else next(createError(404, 'Guide not found'))
        })
        .catch(next)    
}

module.exports.update = (req, res, next) => {  
    
    if(req.file) {
        req.body.avatar = req.file.url
    }
          const {id} = req.body    
          console.log(id)          //con esto le decioms que en el Json nos devuelva el creado
    Guide.findByIdAndUpdate(id, req.body, {new:true, runValidators: true}) //con run queremos que antes de guarlardlo en base de datos ejecute los validadores de mongoose
        .then( guide => {
            if(guide) res.status(204).json(guide)
            else next(createError(404, 'Guide not found'))
        })       
        .catch(next)    
}




