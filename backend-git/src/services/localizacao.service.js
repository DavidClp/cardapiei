const localizacaoRepository = require('../repositories/localizacao.repository');
const createError = require('http-errors')

const create = async function(localizacao){

    const localizacaoCriado = await localizacaoRepository.create(localizacao);
    return localizacaoCriado;
}

const update =  async function(localizacao, id){
    const thereIsEstabelecimento = await localizacaoRepository.findById(id)
    if(!thereIsEstabelecimento){
        return createError(404, 'Localizacao não existe');
    }

    await localizacaoRepository.update(localizacao, id)

    return await localizacaoRepository.findById(id)
}

const updateById =  async function(localizacao, id){
    const thereIsEstabelecimento = await localizacaoRepository.findById(id)
    if(!thereIsEstabelecimento){
        return createError(404, 'Localizacao não existe');
    }

    await localizacaoRepository.update(localizacao, id)

    return await localizacaoRepository.findById(id)
}

const findAll = async function(){
    const localizacaos = await localizacaoRepository.findAll();
    return localizacaos;
}

const findById = async function(id){
    const localizacao = await localizacaoRepository.findById(id);

    if(!localizacao){
        return createError(404, "Localizacao não encontrado")
    }
    return localizacao;
}

const deletar = async function(id){
    const localizacao = await localizacaoRepository.findById(id);

    if(!localizacao){
        return createError(404, "Localizacao não encontrado")
    }
    await localizacaoRepository.deletar(id);
    return localizacao;
}

module.exports = {
    create,
    update,
    updateById,
    findAll,
    findById,
    deletar,
}