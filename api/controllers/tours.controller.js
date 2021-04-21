
const Tour = require('../models/tour.model');
const createError = require('http-errors');

module.exports.create = (req, res, next) => {

    req.body.owner = req.user.id  
console.log(req.body)
   
    if (req.files) {

        if (req.files.images) {

                req.body.images = req.files.images.map(file => file.secure_url);

        } 
        
        if (req.files.avatar) {
            
                req.body.avatar = req.files.avatar[0].secure_url
        }

       
    }
    console.log(req.body)
    Tour.create(req.body)
        .then(tour => res.status(201).json(tour))
        .catch(next)

}


module.exports.list = (req, res, next) => {

    

    Tour.find() //no hay criterio de busqueda
        .populate('owner', '_id name email')  //le envío al tour solo el id nombre e emial del creador del tour
        .then(tours => res.status(200).json(tours)) //recojo todos los eventos y lo devuelvo
        .catch(next)
}


module.exports.detail = (req, res, next) => {
    Tour.findById(req.params.id)
        .populate('owner', '_id name email avatar')  //le envío al tour solo el id nombre e emial del creador del tour
        .then(tour => res.json(tour))
        .catch(next)
}


module.exports.delete = (req, res, next) => {
    Tour.findById(req.params.id)
        .then(tour => {
            if (!tour) next(createError(404, 'Tour not found'))
            else if (tour.owner != req.user.id) next(createError(403, 'Not allowed'))
            else return tour.delete()
                .then(() => res.status(204).json({}))
                .catch(next)
        })
}

module.exports.update = (req, res, next) => {

    delete req.body.owner;

    Tour.findById(req.params.id)
        .then(tour => {
            if (!tour) next(createError(404, 'Tour not found'))
            else if (tour.owner != req.user.id) next(createError(403, 'Not allowed'))
            else {
                Object.assign(tour, req.body)  //Object assign le añade las propiedades al tour, y si existen las pisa
                return tour.save()
                    .then(event => res.json(event))
            }
        })
        .catch(next)
}



module.exports.uploadImages = async(req, res) => {

    const images = []

      const files = req.files;      
      for (const file of files) {
        const {path} = file;
        images.push(path)} 

        


}







module.exports.listByGuide = (req, res, next) => {

}
