const express = require('express');
const router = express.Router();
const horarioController = require('../controllers/horario.controller');
const horarioValidator = require('../validators/horario.validator');
const veriftJWT = require('../middlewares/authorizator')

router.post('/', veriftJWT, horarioController.create);

router.get('/geral', veriftJWT, horarioController.findAll);

router.get('/:id', veriftJWT, horarioController.findByEstId);

router.get('/geral/:id', veriftJWT, horarioValidator.findById(), horarioController.findById);

router.get('/:id', veriftJWT, horarioValidator.findById(), horarioController.findById);

router.put('/:id', veriftJWT, horarioValidator.update(), horarioController.update);

router.delete('/:id', veriftJWT, horarioValidator.deletar(), horarioController.deletar);

module.exports = router;