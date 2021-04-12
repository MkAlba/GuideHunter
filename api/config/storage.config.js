const cloudinary = require('cloudinary');
const CloudinaryStorage  = require('multer-storage-cloudinary');
const multer = require('multer');
 
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET
});

const storage = new CloudinaryStorage({
    cloudinary,
    folder: 'GuidesHunter',
    allowedFormats: ['jpg','png'],
    filename: function (req, file, cb) {
        cb(null, file.originalname + '-' + Date.now())
    }
})
 

module.exports = multer({ 
  storage:storage,
});