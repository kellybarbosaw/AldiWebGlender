const express = require('express');
const router = express.Router();
const clientController = require('../controllers/clientController');


router.get('/',clientController.select);
router.get('/:id',clientController.selectId);
router.post('/',clientController.register);
router.put('/',clientController.update);
router.delete('/:id',clientController.delete);

module.exports = router;