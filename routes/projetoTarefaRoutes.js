const express = require('express');
const router = express.Router();
const projetoTarefaController = require("../controllers/projetoTarefaController");
const auth = require('../controllers/authController');
const authProfile = require('../controllers/accessController');

router.get("/",auth, projetoTarefaController.select);
router.get("/:id",auth, projetoTarefaController.selectId);
router.get('/tarefas',auth,projetoTarefaController.selectTarefa);
router.get('/projeto',auth,projetoTarefaController.selectProjeto);
router.get("/projeto/:id", projetoTarefaController.selectAProjetoTarefaWithIdProjeto);
router.post("/",auth, projetoTarefaController.register);
router.put("/",auth,authProfile, projetoTarefaController.update);
router.put("/mudarEtapa/:id",auth, projetoTarefaController.updateEtapa);
router.delete("/:id",auth,authProfile, projetoTarefaController.delete);

module.exports = router;