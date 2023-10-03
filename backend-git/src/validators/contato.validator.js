const { body, param } = require('express-validator')
const { validatorMessage } = require('../utils/errorMessage');


const update = function(){
    return[
        param('id', validatorMessage('Id')).exists().bail().isInt()
    ]
}

const findById = function(){
    return[
        param('id', validatorMessage('Id')).exists().bail().isInt()
    ]
}

const deletar = function(){
    return[
        param('id', validatorMessage('Id')).exists().bail().isInt()
    ]
}


module.exports = {
    update,
    findById,
    deletar
}