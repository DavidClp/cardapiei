const { body, param } = require('express-validator')
const { validatorMessage } = require('../utils/errorMessage');
/* 
const create = function(){
    return[
        body('nome', validatorMessage('Nome')).exists().bail().isString(),
    ]
} */

const update = function(){
    return[
        /* body('nome', validatorMessage('Nome')).exists().bail().isString(), */
        param('id', validatorMessage('Id')).exists().bail().isInt()
    ]
}

const findById = function(){
    return[
        param('id', validatorMessage('Id')).exists().bail().isInt()
    ]
}

const findByUserId = function(){
    return[
        param('usu_id', validatorMessage('Id')).exists().bail().isInt()
    ]
}

const deletar = function(){
    return[
        param('id', validatorMessage('Id')).exists().bail().isInt()
    ]
}

module.exports = {
 /*    create, */
    update,
    findById,
    findByUserId,
    deletar
}