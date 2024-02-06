const express = require('express');
const router = express.Router();
const contractController = require('../controllers/contractController');


router.get('/',contractController.select);
router.get('/:id',contractController.selectId);
router.post('/',contractController.register);
router.put('/',contractController.update);
router.delete('/:id',contractController.delete);
router.get('/client/:id',contractController.selectContractsClient);

module.exports = router;