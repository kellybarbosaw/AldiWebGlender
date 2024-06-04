const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projectController');
const auth = require('../controllers/authController');
const authProfile = require('../controllers/accessController');


router.get('/',auth,projectController.select);
router.get('/client',auth,projectController.selectClients);
router.get('/tarefa',auth,projectController.selectTarefas);
router.get('/contrato',auth,projectController.selectContratos);
router.get('/projetoTarefa',auth,projectController.selectprojetoTarefa);
router.get('/:id',auth,projectController.selectId);
router.get('/client/:id',auth,projectController.selectProjectsClients);
router.get('/contract/:id',auth,projectController.selectProjectsContract);
router.post('/',auth,projectController.register);
router.put('/',auth,authProfile,projectController.update);
router.delete('/:id',auth,authProfile,projectController.delete);

module.exports = router;