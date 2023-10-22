const express = require('express');
const router = express.Router();
const estabelecimentoController = require('../controllers/estabelecimento.controller');
const estabelecimentoValidator = require('../validators/estabelecimento.validator');
const veriftJWT = require('../middlewares/authorizator');

const multer = require('multer');
const { uploadLogo } = require("../services/fisebase")

const Multer = multer({
    storage: multer.memoryStorage(),
    //limits: 1024 * 1024 //1 mb
})

router.post('/', veriftJWT, Multer.single("logo"), uploadLogo, estabelecimentoController.create);

router.get('/geral/all', veriftJWT, estabelecimentoController.findAll);

router.get('/user/', veriftJWT, estabelecimentoController.findByUserId);

router.get('/:estabelecimento', estabelecimentoController.findByUrl);

router.get('/geral/:id', veriftJWT, estabelecimentoValidator.findById(), estabelecimentoController.findById);

router.get('/get_url/:id', veriftJWT, estabelecimentoController.findUrl);


router.put('/geral/:id', veriftJWT,Multer.single("logo"), uploadLogo,  estabelecimentoController.updateById);
router.put('/', veriftJWT, estabelecimentoController.update);

router.delete('/:id', veriftJWT, estabelecimentoValidator.deletar(), estabelecimentoController.deletar);

module.exports = router;