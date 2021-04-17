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
const searchController = require('../controllers/search.controller');





//MIDDLEWARES

const secure = require('../middlewares/secure.middleware');
const checkRole = require('../middlewares/checkRole.middleware');

//CONFIGS
const storage = require('../config/storage.config');

//GUIDES

router.post('/guides', secure.isAuthenticated, storage.single('avatar'), guideController.create); 
router.get('/guides',  guideController.list); 
router.get('/guides/:id',  guideController.detail); 
router.put('/guides/:id', checkRole.isGuide,  secure.isAuthenticated, storage.single('avatar'), guideController.update); //secure.isAuthenticated,
router.delete('/guides/:id', checkRole.isGuide, secure.isAuthenticated, storage.single('avatar'), storage.array('images', 6), guideController.delete);//secure.isAuthenticated,




//GUIDES TOURS 
router.get('/tours', tourController.list);
router.post('/tours', tourController.create); //secure.isAuthenticated,
router.get('/tours/:id', tourController.detail); 
router.put('/tours/:id',secure.isAuthenticated, tourController.update); //secure.isAuthenticated,
router.delete('/tours/:id',secure.isAuthenticated, tourController.delete); //secure.isAuthenticated,


router.get('/guides/:guideId/tours', tourController.listByGuide); 



//USERS
router.get('/users', secure.isAuthenticated,  userController.list); //secure.isAuthenticated,
router.get('/users/:id', secure.isAuthenticated, storage.single('avatar'), userController.detail); //secure.isAuthenticated,
router.patch('/users/:id', secure.isAuthenticated,  storage.single('avatar'), userController.update);  //secure.isAuthenticated, 
router.delete('/users/:id', secure.isAuthenticated, storage.single('avatar'), userController.delete); //secure.isAuthenticated,



// INTRANET - MESSAGES


router.post('/message', messageController.message);
router.get('/messages', secure.isAuthenticated, messageController.checkMessages);
router.post('/messages/:id/read', secure.isAuthenticated, messageController.read);

//router.get('/guides/me/messages',  secure.isAuthenticated,  messageController.chat);
//router.get('/guides/me/message/check/:id', secure.isAuthenticated, messageController.checkMessage);






//REGISTER-LOGIN
router.post('/register', userController.register);
router.post('/login', userController.login);
//router.post('/totp', secure.isAuthenticated1FA, users.totp);
router.post('/logout', secure.isAuthenticated, userController.logout) //secure.isAuthenticated,
router.get('/authenticate/google', passport.authenticate('google-auth', { scope: GOOGLE_SCOPES }))
router.get('/authenticate/google/ghunter', userController.loginWithGoogle) ///


router.get('/search/', searchController.search)


router.use((req, res, next) => {
    next(createError(404, 'Path not found'))
  })



module.exports = router;