const express = require('express');
const router = express.Router();
const clientController = require('../controllers/clientController');
const auth = require('../controllers/authController');
const authProfile = require('../controllers/accessController');


router.get('/',auth,clientController.select);
router.get('/:id',auth,clientController.selectId);
router.post('/',auth,clientController.register);
router.put('/',auth,authProfile,clientController.update);
router.delete('/:id',auth,authProfile,clientController.delete);

module.exports = router;


// const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;
