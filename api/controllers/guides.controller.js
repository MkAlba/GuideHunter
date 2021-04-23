const Guide = require('../models/guide.model');
const createError = require('http-errors');
const passport = require('passport');



module.exports.list = async (req, res, next) => {
    let criteria = {}
    const { search, languages } = req.query;

    if (search) {
        criteria = {
            $or:
                [
                    { name: new RegExp(search, 'i') },                   
                    { experience: new RegExp(search, 'i') }
                ]
        }
    }

    if (languages) {
        criteria.languages = { $all: languages }

    }


    Guide.find(criteria)
        .then(guides => {
            if (!req.user) {
                res.status(200).json(guides)
            }
            else
                res.status(200).json(guides.filter(guide => guide.id != req.user.id))
        })

        .catch(next)
}


module.exports.detail = (req, res, next) => {
    Guide.findById(req.params.id)
        .then(guide => res.json(guide))
        .catch(next)
}




module.exports.create = (req, res, next) => {

    console.log(req.body)

        req.body.languages = typeof(req.body.languages) === Array ? req.body.languages : req.body.languages.split(',')

    if (req.files) {

        if (req.files.images) {

                req.body.images = req.files.images.map(file => file.secure_url);

        } 
        
        if (req.files.avatar) {
            
                req.body.avatar = req.files.avatar[0].secure_url
        }

       
    }
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

    if (req.file) {
        req.body.avatar = req.file.url
    }

    Guide.findByIdAndDelete(req.params.id)
        .then(guide => {
            if (guide) res.status(204).json({})
            else next(createError(404, 'Guide not found'))
        })
        .catch(next)
}

module.exports.update = (req, res, next) => {

    console.log(req.body)

        req.body.languages = typeof(req.body.languages) === Array ? req.body.languages : req.body.languages.split(',')

    if (req.files) {

        if (req.files.images) {

                req.body.images = req.files.images.map(file => file.secure_url);

        } 
        
        if (req.files.avatar) {
            
                req.body.avatar = req.files.avatar[0].secure_url
        }

       
    }

   // delete req.body.id;
    delete req.body.createdAt;
    delete req.body.updatedAt;

    const { id } = req.body
         
    //con esto le decioms que en el Json nos devuelva el creado
    Guide.findById(id) //con run queremos que antes de guarlardlo en base de datos ejecute los validadores de mongoose
        .then(guide => {
            if (guide) {
                Object.assign(guide, req.body)
                return guide.save()
                    .then(guide => res.json(guide))
            }
            else next(createError(404, 'Guide not found'))
        })
        .catch(next)
}



module.exports.uploadImages = async(req, res) => {
 

}
