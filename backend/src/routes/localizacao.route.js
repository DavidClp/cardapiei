const express = require('express');
const router = express.Router();
const localizacaoController = require('../controllers/localizacao.controller');
const localizacaoValidator = require('../validators/localizacao.validator');
const veriftJWT = require('../middlewares/authorizator')

router.post('/', veriftJWT, localizacaoController.create);

router.get('/', veriftJWT, localizacaoController.findAll);

router.get('/geral/:id', veriftJWT, localizacaoValidator.findById(), localizacaoController.findById);

router.get('/:id', veriftJWT, localizacaoController.findByEstId);

router.put('/geral/:id', veriftJWT, localizacaoValidator.update(), localizacaoController.updateById);

router.put('/:id', veriftJWT, localizacaoController.updateByEstId);

router.delete('/:id', veriftJWT, localizacaoValidator.deletar(), localizacaoController.deletar);

module.exports = router;