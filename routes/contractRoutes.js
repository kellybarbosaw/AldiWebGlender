const express = require('express');
const router = express.Router();
const contractController = require('../controllers/contractController');
const auth = require('../controllers/authController');
const authProfile = require('../controllers/accessController');


router.get('/',auth,contractController.select);
router.get('/:id',auth,contractController.selectId);
router.post('/',auth,contractController.register);
router.put('/',auth,authProfile,contractController.update);
router.delete('/:id',auth,authProfile,contractController.delete);
router.get('/client/:id',auth,contractController.selectContractsClient);

module.exports = router;