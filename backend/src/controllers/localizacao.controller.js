const { validationResult } = require('express-validator');
const localizacaoService = require('../services/localizacao.service');
const estabelecimentoRepository = require('../repositories/estabelecimento.repository');
const createError = require('http-errors');

const create = async function(req, res, next){
    try {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            throw createError(422, {errors: errors.array()});
        }

        estabelecimento = await estabelecimentoRepository.findOneByWhere({usu_id: req.usuario_id});
        const response = await localizacaoService.create({
            cep: req.body.cep,
            endereco: req.body.endereco,
            numero: req.body.numero,
            bairro: req.body.bairro,
            cidade: req.body.cidade,
            est_id: estabelecimento.id
        });
        if(response && response.message){
            throw response;
        }

        const token = req.token;
        res.send({ token, ...response });
    } catch (error) {
        return next(error);
    }
}

const updateByEstId = async function(req, res, next){
    try {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            throw createError(422, { errors: errors.array() })
        }
        
        const response = await localizacaoService.update({
            cep: req.body.cep,
            endereco: req.body.endereco,
            numero: req.body.numero,
            bairro: req.body.bairro,
            cidade: req.body.cidade,
        }, req.params.id);
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
        
        const response = await localizacaoService.updateById({
            cep: req.body.cep,
            endereco: req.body.endereco,
            numero: req.body.numero,
            bairro: req.body.bairro,
            cidade: req.body.cidade,
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
        const localizacaos = await localizacaoService.findAll();
        res.send(localizacaos);
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
        
        const response = await localizacaoService.findById(req.params.id);
        if(response && response.message){
            throw response;
        }

        res.send(response);
    } catch (error) {
        next(error);
    }
    
}

const findByEstId = async function(req, res, next){
    try {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            throw createError(422, {errors: errors.array()});
        }
        
        const response = await localizacaoService.findByEstId(req.params.id);
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
        
        const response = await localizacaoService.deletar(req.params.id);
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
    updateByEstId,
    findAll,
    findById,
    updateById,
    deletar,
    findByEstId
}