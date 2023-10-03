const express = require('express');
const router = express.Router();
const estabelecimentoController = require('../controllers/estabelecimento.controller');
const estabelecimentoValidator = require('../validators/estabelecimento.validator');
const veriftJWT = require('../middlewares/authorizator')

router.post('/', veriftJWT, estabelecimentoController.create);

router.get('/geral/all', veriftJWT, estabelecimentoController.findAll);

router.get('/user/', veriftJWT, estabelecimentoController.findByUserId);

router.get('/:estabelecimento', estabelecimentoController.findByUrl);

router.get('/geral/:id', veriftJWT, estabelecimentoValidator.findById(), estabelecimentoController.findById);

router.put('/:id', veriftJWT, estabelecimentoValidator.update(), estabelecimentoController.updateById);
router.put('/', veriftJWT, estabelecimentoController.update);

router.delete('/:id', veriftJWT, estabelecimentoValidator.deletar(), estabelecimentoController.deletar);

module.exports = router;