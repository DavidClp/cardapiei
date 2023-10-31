const express = require('express');
const router = express.Router();
const produtoController = require('../controllers/produto.controller');
const produtoValidator = require('../validators/produto.validator');
const veriftJWT = require('../middlewares/authorizator');

const multer = require('multer');
const { uploadImagem } = require("../services/fisebase")

const Multer = multer({
    storage: multer.memoryStorage(),
    //limits: 1024 * 1024 //1 mb
})

router.post('/:cat_id', veriftJWT, Multer.single("imagem"), uploadImagem, produtoController.create);

router.get('/all', veriftJWT, produtoController.findAll);

router.get('/:id', veriftJWT, produtoController.findByCatId);

router.get('/geral/:id', veriftJWT, produtoValidator.findById(), produtoController.findById);

router.put('/:id', veriftJWT, Multer.single("imagem"), uploadImagem, produtoController.update);

router.put('/situacao/:id', veriftJWT, produtoController.updateSituacao);

router.delete('/:id', veriftJWT, produtoValidator.deletar(), produtoController.deletar);

module.exports = router;