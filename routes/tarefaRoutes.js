const express = require('express');
const router = express.Router();
const tarefaController = require("../controllers/tarefaController");
const auth = require('../controllers/authController');
const authProfile = require('../controllers/accessController');

router.get("/",auth, tarefaController.select);
router.get("/:id",auth, tarefaController.selectId);
router.post("/",auth, tarefaController.register);
router.put("/",auth,authProfile, tarefaController.update);
router.delete("/:id",auth,authProfile, tarefaController.delete);

module.exports = router;