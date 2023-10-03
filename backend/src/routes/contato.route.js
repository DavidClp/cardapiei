const express = require('express');
const router = express.Router();
const contatoController = require('../controllers/contato.controller');
const contatoValidator = require('../validators/contato.validator');
const veriftJWT = require('../middlewares/authorizator')

router.post('/', veriftJWT,  contatoController.create);

router.get('/geral', veriftJWT, contatoController.findAll);

router.get('/:id', veriftJWT, contatoController.findByEtbId);

router.get('/geral/:id', veriftJWT, contatoValidator.findById(), contatoController.findById);

router.put('/:id', veriftJWT, contatoValidator.update(), contatoController.update);

router.delete('/:id', veriftJWT, contatoValidator.deletar(), contatoController.deletar);

module.exports = router;