const express = require('express');
const router = express.Router();
const localizacaoController = require('../controllers/localizacao.controller');
const localizacaoValidator = require('../validators/localizacao.validator');
const veriftJWT = require('../middlewares/authorizator')

router.post('/', veriftJWT, localizacaoController.create);

router.get('/', veriftJWT, localizacaoController.findAll);

router.get('/:id', veriftJWT, localizacaoValidator.findById(), localizacaoController.findById);

router.put('/:id', veriftJWT, localizacaoValidator.update(), localizacaoController.updateById);

router.put('/', veriftJWT, localizacaoController.update);

router.delete('/:id', veriftJWT, localizacaoValidator.deletar(), localizacaoController.deletar);

module.exports = router;