const express = require('express');
const router = express.Router();
const pessoaController = require("../controllers/pessoaController");
const auth = require('../controllers/authController');
const authProfile = require('../controllers/accessController');

router.get("/",auth, pessoaController.select);
router.get("/zusuarios",auth, pessoaController.selectZusuarios);
router.get("/:id",auth, pessoaController.selectId);
router.post("/",auth, pessoaController.register);
router.put("/",auth,authProfile, pessoaController.update);
router.delete("/:id",auth,authProfile, pessoaController.delete);

module.exports = router;