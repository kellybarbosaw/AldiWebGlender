const express = require('express');
const router = express.Router();
const recursoController = require('../controllers/recursoController');
const auth = require('../controllers/authController');
const authProfile = require('../controllers/accessController');

router.get("/",auth, recursoController.select);
router.get("/zpessoas",auth, recursoController.selectZpessoas);
router.get("/tipoRecurso",auth, recursoController.selectTipoRecurso);
router.get("/:id",auth, recursoController.selectId);
router.post("/",auth, recursoController.register);
router.put("/",auth,authProfile, recursoController.update);
router.delete("/:id",auth,authProfile, recursoController.delete);

module.exports = router;