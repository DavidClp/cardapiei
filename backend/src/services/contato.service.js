const contatoRepository = require('../repositories/contato.repository');
const createError = require('http-errors')

const create = async function(contato){

    const contatoCriado = await contatoRepository.create(contato);
    return contatoCriado;
}

const update =  async function(contato, id){
    const thereIsEstabelecimento = await contatoRepository.findById(id)
    if(!thereIsEstabelecimento){
        return createError(404, 'Contato não existe');
    }

    await contatoRepository.update(contato, id)

    return await contatoRepository.findById(id)
}

const findAll = async function(){
    const contatos = await contatoRepository.findAll();
    return contatos;
}

const findById = async function(id){
    const contato = await contatoRepository.findById(id);

    if(!contato){
        return createError(404, "Contato não encontrado")
    }
    return contato;
}

const findByEtbId = async function(id){
    const contato = await contatoRepository.findAllByWhere({est_id: id});

  /*   if(!contato){
        return createError(404, "Contatos não encontrado")
    } */
    return contato;
}

const deletar = async function(id){
    const contato = await contatoRepository.findById(id);

    if(!contato){
        return createError(404, "Contato não encontrado")
    }
    await contatoRepository.deletar(id);
    return contato;
}

module.exports = {
    create,
    update,
    findAll,
    findById,
    findByEtbId,
    deletar,
}