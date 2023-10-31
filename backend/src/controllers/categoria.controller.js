const { validationResult } = require('express-validator');
const categoriaService = require('../services/categoria.service');
const estabelecimentoRepository = require('../repositories/estabelecimento.repository');
const createError = require('http-errors');

const create = async function(req, res, next){
    try {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            throw createError(422, {errors: errors.array()});
        }

        estabelecimento = await estabelecimentoRepository.findOneByWhere({usu_id: req.usuario_id});
        const response = await categoriaService.create({
            nome: req.body.nome,
            est_id: estabelecimento.id,
            ativo: 1,
        });
        if(response && response.message){
            throw response;
        }

        res.send(response)
    } catch (error) {
        return next(error);
    }
}

const update = async function(req, res, next){
    try {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            throw createError(422, { errors: errors.array() })
        }
        
        const response = await categoriaService.update({
            nome: req.body.nome
        }, req.params.id);
        if(response && response.message){
            throw response;
        }

        res.send(response)
    } catch (error) {
        return next(error);
    }
}

const updateSituacao = async function(req, res, next){
    try {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            throw createError(422, { errors: errors.array() })
        }
        
        const response = await categoriaService.updateSituacao({
            ativo: req.body.ativo
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
        const categorias = await categoriaService.findAll();
        res.send(categorias);
    } catch (error) {
        next(error);
    }
}

const findByEtbId = async function(req, res, next){
    try {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            throw createError(422, {errors: errors.array()});
        }
        const response = await categoriaService.findByEstId(req.params.id);
        if(response && response.message){
            throw response;
        }
        res.send(response);
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
        
        const response = await categoriaService.findById(req.params.id);
        if(response && response.message){
            throw response;
        }

        res.send(response);
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
        
        const response = await categoriaService.deletar(req.params.id);
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
    updateSituacao,
    findAll,
    findByEtbId,
    findById,
    deletar,
}