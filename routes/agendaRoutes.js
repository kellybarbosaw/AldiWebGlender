const express = require('express');
const router = express.Router();
const agendaController = require('../controllers/agendaController');
const auth = require('../controllers/authController');
const authProfile = require('../controllers/accessController');


router.get("/",auth, agendaController.select);
router.get("/:id",auth, agendaController.selectId);
router.post("/",auth, agendaController.register);
router.put("/",auth,authProfile, agendaController.update);
router.delete("/:id",auth,authProfile, agendaController.delete);
router.get('/agendasByUsuarioCriacao', agendaController.selectByUsuarioCriacao);



module.exports = router;