const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const auth = require('../controllers/authController');
const authProfile = require('../controllers/accessController');


router.get('/',auth,authProfile,userController.select);
router.post('/register',auth,authProfile,userController.register);
router.post('/login',userController.login);
router.get('/:user',auth,authProfile,userController.selectUser);
router.put('/',auth,authProfile,userController.update);
router.delete('/:user',auth,authProfile,userController.delete);

module.exports = router;