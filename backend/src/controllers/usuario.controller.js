const { validationResult } = require('express-validator');
const usuarioService = require('../services/usuario.service');
const createError = require('http-errors');

const create = async function(req, res, next){
    try {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            throw createError(422, {errors: errors.array()});
        }

        const response = await usuarioService.create(req.body);
        if(response && response.message){
            throw response;
        }
        /* GAMBIRRA, CONSERTAR QUANDO FRONT END ESTIVER PRONTO */
        req.usuario_id = response.id
        /* GAMBIRRA, CONSERTAR QUANDO FRONT END ESTIVER PRONTO */

        const token = response.token;
        res.send({ token, ...response });
    } catch (error) {
        return next(error);
    }
}

const login = async function(req, res, next){
    try {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            throw createError(422, {errors: errors.array()});
        }

        const response = await usuarioService.login(req.body);
        if(response && response.message){
            throw response;
        }
        console.log(response.token)
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
        
        const response = await usuarioService.update({
            nome: req.body.nome,
            senha: req.body.senha,
            email: req.body.email,
            plano: req.body.plano,
            dataUltimoPagamento: req.body.dataUltimoPagamento,
        }, req.params.id);
        if(response && response.message){
            throw response;
        }
        res.send(response)
    } catch (error) {
        return next(error);
    }
}

const updateSenhaUserAtual = async function(req, res, next){
    try {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            throw createError(422, { errors: errors.array() })
        }
        
        const response = await usuarioService.update({
            senha: req.body.senha
        }, req.usuario_id);
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
        const usuarios = await usuarioService.findAll();
        res.send(usuarios);
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
        
        const response = await usuarioService.findById(req.params.id);
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
        
        const response = await usuarioService.deletar(req.params.id);
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
    login,
    update,
    updateSenhaUserAtual,
    findAll,
    findById,
    deletar,
}