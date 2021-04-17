const createError = require('http-errors');
const Guides = require('../models/guide.model');

const Users = require('../models/user.model');
const Tours = require('../models/tour.model');
const Messages = require('../models/message.model');




module.exports.search = async (req, res, next) => {

 // console.log(req.query)
  //console.log(req.params)

  
  let { keyword, languages } = req.query
  
  if(languages) {guide.languages = Object.values(languages)}
  console.log(1111111)
  console.log(guide.languages)

  if (keyword === undefined) { keyword = '' }
  

  
  
  //let guides = []
  //let tours = []

  try {
    

    guides = await Guides.find({
      $or: [
        { experience: { $regex: keyword, $options: "i" } },
        { name: { $regex: keyword, $options: "i" } }]
        
    })
      .populate('tours')
      .sort('-1')
      .limit(3)
    tours = await Tours.find({
      $or: [
        { title: { $regex: keyword, $options: "i" } },
        { category: { $regex: keyword, $options: "i" } },
       
      ]
    })
      .sort('1')
   
  } catch (err) {
    next(err);
  }
};


