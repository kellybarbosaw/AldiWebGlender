const express = require('express');
const router = express.Router();
const tipoRecursoController = require("../controllers/tipoRecursoController");
const auth = require('../controllers/authController');
const authProfile = require('../controllers/accessController');

router.get("/",auth, tipoRecursoController.select);
router.get("/:id",auth, tipoRecursoController.selectId);
router.post("/",auth, tipoRecursoController.register);
router.put("/",auth,authProfile, tipoRecursoController.update);
router.delete("/:id",auth,authProfile, tipoRecursoController.delete);

module.exports = router;