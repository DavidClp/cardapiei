const express = require('express');
const router = express.Router();
const categoriaController = require('../controllers/categoria.controller');
const categoriaValidator = require('../validators/categoria.validator');
const veriftJWT = require('../middlewares/authorizator')

router.post('/', veriftJWT, categoriaValidator.create(), categoriaController.create);

router.get('/all', veriftJWT, categoriaController.findAll);

router.get('/geral/:id', veriftJWT, categoriaValidator.findById(), categoriaController.findById);

router.get('/:id', veriftJWT,  categoriaController.findByEtbId);

router.put('/:id', veriftJWT, categoriaController.update);

router.put('/situacao/:id', veriftJWT,  categoriaController.updateSituacao);

router.delete('/:id', veriftJWT, categoriaValidator.deletar(), categoriaController.deletar);

module.exports = router;