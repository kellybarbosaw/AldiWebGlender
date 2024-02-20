const express = require('express');
const router = express.Router();
const tarefaStatusController = require('../controllers/tarefaStatusController');
const auth = require('../controllers/authController');
const authProfile = require('../controllers/accessController');


router.get('/',auth,tarefaStatusController.select);
router.get('/:id',auth,tarefaStatusController.selectId);
router.post('/',auth,tarefaStatusController.register);
router.put('/',auth,authProfile,tarefaStatusController.update);
router.delete('/:id',auth,authProfile,tarefaStatusController.delete);

module.exports = router;