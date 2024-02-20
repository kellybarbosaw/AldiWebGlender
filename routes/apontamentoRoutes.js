const express = require('express');
const router = express.Router();
const apontamentoController = require('../controllers/apontamentoController');
const auth = require('../controllers/authController');
const authProfile = require('../controllers/accessController');


router.get("/",auth, apontamentoController.select);
router.get("/:id",auth, apontamentoController.selectId);
router.post("/",auth, apontamentoController.register);
router.put("/",auth,authProfile, apontamentoController.update);
router.delete("/:id",auth,authProfile, apontamentoController.delete);

module.exports = router;