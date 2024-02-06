const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/',userController.select);
router.post('/register',userController.register);
router.post('/login',userController.login);
router.get('/:user',userController.selectUser);
router.put('/',userController.update);
router.delete('/:user',userController.delete);

module.exports = router;