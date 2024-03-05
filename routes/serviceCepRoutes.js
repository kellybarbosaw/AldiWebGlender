const express = require('express');
const router = express.Router();
const serviceCepController = require('../controllers/serviceCepController');

router.get("/",serviceCepController.selectCep);
router.get("/pais",serviceCepController.selectPais);
router.get("/estado",serviceCepController.selectEstado);
router.get("/estado/:id_pais",serviceCepController.selectEstadoPais);
router.get("/cidade/:uf",serviceCepController.selectCidade);
router.get("/orgaoemissor",serviceCepController.selectOrgaoEmissor);

module.exports = router;

