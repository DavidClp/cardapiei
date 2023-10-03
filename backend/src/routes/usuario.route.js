const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuario.controller');
const estabelecimentoController = require('../controllers/estabelecimento.controller');
const localizacaoController = require('../controllers/localizacao.controller');
const horarioController = require('../controllers/horario.controller');
const contatoController = require('../controllers/contato.controller');
const veriftJWT = require('../middlewares/authorizator')
const usuarioValidator = require('../validators/usuario.validator');

router.post('/', usuarioValidator.create(),  usuarioController.create);
/* router.post('/', usuarioValidator.create(),  usuarioController.create, estabelecimentoController.create, horarioController.create, contatoController.create, localizacaoController.create); */

router.post('/login', usuarioValidator.login(),  usuarioController.login);

router.get('/', veriftJWT, usuarioController.findAll);

router.get('/:id', veriftJWT, usuarioValidator.findById(), usuarioController.findById);

router.put('/:id', veriftJWT, usuarioValidator.update(), usuarioController.update);

router.delete('/:id', veriftJWT, usuarioValidator.deletar(), usuarioController.deletar);

module.exports = router;