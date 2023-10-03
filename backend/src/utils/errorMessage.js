const validatorMessage = function(atributo){
    return `A propiedade '${atributo}' é invalido`;
}

const notExists = function(atributo){
    return `${atributo} não existe`;
}

module.exports = {
    validatorMessage,
    notExists
}
