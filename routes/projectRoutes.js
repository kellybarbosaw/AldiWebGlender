const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projectController');


router.get('/',projectController.select);
router.get('/:id',projectController.selectId);
router.get('/client/:id',projectController.selectProjectsClients);
router.get('/contract/:id',projectController.selectProjectsContract);
router.post('/',projectController.register);
router.put('/',projectController.update);
router.delete('/:id',projectController.delete);

module.exports = router;