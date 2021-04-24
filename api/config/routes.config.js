const express = require('express');
const createError = require('http-errors');
const router = express.Router();
const passport = require('passport');
const GOOGLE_SCOPES = ['https://www.googleapis.com/auth/userinfo.email', 'https://www.googleapis.com/auth/userinfo.profile']

const userController = require('../controllers/users.controller');
const guideController = require('../controllers/guides.controller');
const messageController = require('../controllers/messages.controller');
const reviewController = require('../controllers/reviews.controller');
const tourController = require('../controllers/tours.controller');






//MIDDLEWARES

const secure = require('../middlewares/secure.middleware');
const checkRole = require('../middlewares/checkRole.middleware');

//CONFIGS
const storage = require('../config/storage.config');

//GUIDES

router.post('/guides', secure.isAuthenticated, storage.fields([{ name: 'avatar', maxCount: 1 }, { name: 'images', maxCount: 3 }]), guideController.create);
router.get('/guides', guideController.list);
router.get('/guides/:id', guideController.detail);
router.put('/guides/:id', checkRole.isGuide, secure.isAuthenticated, storage.fields([{ name: 'avatar', maxCount: 1 }, { name: 'images', maxCount: 3 }]), guideController.update); //secure.isAuthenticated,
router.delete('/guides/:id', checkRole.isGuide, secure.isAuthenticated, storage.single('avatar'), storage.array('images', 6), guideController.delete);//secure.isAuthenticated,

router.patch('/guides/upload-images', secure.isAuthenticated, storage.array('images', 3), guideController.uploadImages)



//GUIDES TOURS 
router.get('/tours', tourController.list);
router.post('/tours', secure.isAuthenticated, checkRole.isGuide, storage.fields([{ name: 'avatar', maxCount: 1 }, { name: 'images', maxCount: 3 }]), tourController.create); //secure.isAuthenticated,
router.get('/tours/:id', tourController.detail);
router.put('/tours/:id', secure.isAuthenticated, checkRole.isGuide, storage.array('images', 3), tourController.update); //secure.isAuthenticated,
router.delete('/tours/:id', secure.isAuthenticated, checkRole.isGuide, storage.array('images', 3), tourController.delete); //secure.isAuthenticated,




router.get('/guides/:guideId/tours', tourController.listByGuide);



//USERS
router.get('/users', secure.isAuthenticated, userController.list); 
router.get('/users/:id', secure.isAuthenticated, storage.single('avatar'), userController.detail);


router.patch('/form-user/:id', secure.isAuthenticated, storage.single('avatar'), userController.update);  //secure.isAuthenticated, 



router.delete('/users/:id', secure.isAuthenticated, storage.single({ name: 'avatar', maxCount: 1 }), userController.delete); //secure.isAuthenticated,



// INTRANET - MESSAGES

router.patch('/messages/:id/read', secure.isAuthenticated, messageController.read);




router.post('/message', secure.isAuthenticated, messageController.message);
router.get('/onemessage', secure.isAuthenticated, messageController.oneMessage);

router.get('/messages', secure.isAuthenticated, messageController.checkMessages);





//REGISTER-LOGIN
router.post('/register', userController.register);
router.post('/login', userController.login);
//router.post('/totp', secure.isAuthenticated1FA, users.totp);
router.post('/logout', secure.isAuthenticated, userController.logout) //secure.isAuthenticated,
router.get('/authenticate/google', passport.authenticate('google-auth', { scope: GOOGLE_SCOPES }))
router.get('/authenticate/google/ghunter', userController.loginWithGoogle) ///





router.use((req, res, next) => {
  next(createError(404, 'Path not found'))
})



module.exports = router;