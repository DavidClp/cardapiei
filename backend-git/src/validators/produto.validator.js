const { body, param } = require('express-validator')
const { validatorMessage } = require('../utils/errorMessage');

const create = function(){
    return[
        body('nome', validatorMessage('Nome')).exists().bail().isString(),
        body('valor', validatorMessage('Valor')).exists().bail().isDecimal(),
    ]
}

const update = function(){
    return[
        body('nome', validatorMessage('Nome')).exists().bail().isString(),
        body('valor', validatorMessage('Valor')).exists().bail().isDecimal,
        param('id', validatorMessage('Id')).exists().bail().isInt()
    ]
}

const findById = function(){
    return[
        param('id', validatorMessage('Id')).exists().bail().isInt()
    ]
}
const findByEstId = function(){
    return[
        param('est_id', validatorMessage('Id')).exists().bail().isInt()
    ]
}

const deletar = function(){
    return[
        param('id', validatorMessage('Id')).exists().bail().isInt()
    ]
}


module.exports = {
    create,
    update,
    findByEstId,
    findById,
    deletar
}