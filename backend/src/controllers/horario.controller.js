const { validationResult } = require('express-validator');
const horarioService = require('../services/horario.service');
const estabelecimentoRepository = require('../repositories/estabelecimento.repository');
const createError = require('http-errors');

const create = async function(req, res, next){
    try {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            throw createError(422, {errors: errors.array()});
        }

        estabelecimento = await estabelecimentoRepository.findOneByWhere({usu_id: req.usuario_id});
        const response = await horarioService.create({
            dia: req.body.dia,
            hor_abre: req.body.hor_abre,
            hor_fecha: req.body.hor_fecha,
            est_id: estabelecimento.id
        });
        if(response && response.message){
            throw response;
        }

        res.send(response);
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
        
        const response = await horarioService.update({
            dia: req.body.dia,
            hor_abre: req.body.hor_abre,
            hor_fecha: req.body.hor_fecha,
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
        const horarios = await horarioService.findAll();
        res.send(horarios);
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
        
        const response = await horarioService.findById(req.params.id);
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
        
        const response = await horarioService.findByEstId(req.params.id);
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
        
        const response = await horarioService.deletar(req.params.id);
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
    findByEstId,
    findById,
    deletar,
}