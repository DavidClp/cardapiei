const { validationResult } = require('express-validator');
const estabelecimentoService = require('../services/estabelecimento.service');
const createError = require('http-errors');

const create = async function(req, res, next){
    try {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            throw createError(422, {errors: errors.array()});
        }

        const response = await estabelecimentoService.create({
            nome: req.body.nome,
            descricao: req.body.descricao,
            logo: req.file ? req.file.firebaseUrl: null,
            usu_id: req.usuario_id
        });
        if(response && response.message){
            throw response;
        }

        res.send(response);
    } catch (error) {
        return next(error);
    }
}

/* const create = async function(req, res, next){
    try {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            throw createError(422, {errors: errors.array()});
        }
      
        const response = await estabelecimentoService.create({ */
          /*   nome: req.body.nome,
            descricao: req.body.descricao,
            logo: req.body.logo, */
          /*   usu_id: req.usuario_id
        });
 */
   /*      next();
    } catch (error) {
        return next(error);
    } */
/* } */ 

const update = async function(req, res, next){
    try {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            throw createError(422, { errors: errors.array() })
        }
        const response = await estabelecimentoService.update({
            nome: req.body.nome,
            descricao: req.body.descricao,
            logo: req.body.logo,
        }, req.usuario_id);
        if(response && response.message){
            throw response;
        }

        res.send(response)
    } catch (error) {
        return next(error);
    }
}

const updateById = async function(req, res, next){
    try {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            throw createError(422, { errors: errors.array() })
        }
        const response = await estabelecimentoService.updateById({
            nome: req.body.nome,
            descricao: req.body.descricao,
            logo: req.file ? req.file.firebaseUrl: null,
        }, req.params.id);
        if(response && response.message){
            throw response;
        }

        res.send(response)
    } catch (error) {
        return next(error);
    }
}

const findAll = async function(req, res, next){
    try {
        const estabelecimentos = await estabelecimentoService.findAll();
        res.send(estabelecimentos);
    } catch (error) {
        next(error);
    }
}

const findById = async function(req, res, next){
    try {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            throw createError(422, {errors: errors.array()});
        }
        
        const response = await estabelecimentoService.findById(req.params.id);
        if(response && response.message){
            throw response;
        }

        res.send(response);
    } catch (error) {
        next(error);
    }
    
}

const findByUserId = async function(req, res, next){
    try {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            throw createError(422, {errors: errors.array()});
        }
        
        const response = await estabelecimentoService.findByUserId(req.usuario_id);
        if(response && response.message){
            throw response;
        }

        res.send(response);
    } catch (error) {
        next(error);
    }
}

const findByUrl = async function(req, res, next){
    try {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            throw createError(422, {errors: errors.array()});
        }
        
        const response = await estabelecimentoService.findByUrl(req.params.estabelecimento);
        
        if(response && response.message){
            throw response;
        }
        res.send(response);
    } catch (error) {
        next(error);
    }
}
const findUrl = async function(req, res, next){
    try {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            throw createError(422, {errors: errors.array()});
        }
        
        const response = await estabelecimentoService.findById(req.params.id);        
        if(response && response.message){
            throw response;
        }
        res.send(response.url);
    } catch (error) {
        next(error);
    }
}

const deletar = async function(req, res, next){
    try {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            throw createError(422, {errors: errors.array()});
        }
        
        const response = await estabelecimentoService.deletar(req.params.id);
        if(response && response.message){
            throw response;
        }

        res.send(response);
    } catch (error) {
        next(error);
    }
    
}

module.exports = {
    create,
    update,
    findAll,
    findById,
    findByUrl,
    updateById,
    findByUserId,
    deletar,
    findUrl
}