const express = require('express');
const router = express.Router();
const produtoController = require('../controllers/produto.controller');
const produtoValidator = require('../validators/produto.validator');
const veriftJWT = require('../middlewares/authorizator')

router.post('/:cat_id', veriftJWT, produtoValidator.create(), produtoController.create);

router.get('/all', veriftJWT, produtoController.findAll);

router.get('/:id', veriftJWT, produtoController.findByCatId);

router.get('/geral/:id', veriftJWT, produtoValidator.findById(), produtoController.findById);

router.put('/:id', veriftJWT, produtoValidator.update(), produtoController.update);

router.delete('/:id', veriftJWT, produtoValidator.deletar(), produtoController.deletar);

module.exports = router;