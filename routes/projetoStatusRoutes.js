const express = require('express');
const router = express.Router();
const projetoStatusController = require('../controllers/projetoStatusController');
const auth = require('../controllers/authController');
const authProfile = require('../controllers/accessController');

router.get('/',auth,projetoStatusController.select);
router.get('/:id',auth,projetoStatusController.selectId);
router.post('/',auth,projetoStatusController.register);
router.put('/',auth,authProfile,projetoStatusController.update);
router.delete('/:id',auth,authProfile,projetoStatusController.delete);

module.exports = router;