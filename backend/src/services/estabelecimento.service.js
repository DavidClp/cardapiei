const estabelecimentoRepository = require('../repositories/estabelecimento.repository');
const createError = require('http-errors');
const criarURL = require('../utils/criarURL')

const create = async function(estabelecimento){
    const thereEst = await estabelecimentoRepository.findOneByWhere({nome: estabelecimento.nome});
    
    estabelecimento.url = criarURL.criarURL(estabelecimento.nome, thereEst);

    const estabelecimentoCriado = await estabelecimentoRepository.create(estabelecimento);
    /* return estabelecimentoCriado; */
}

const update =  async function(estabelecimento, usu_id){
    const thereIsEstabelecimento = await estabelecimentoRepository.findOneByWhere(usu_id);
    if(!thereIsEstabelecimento){
        return createError(404, 'Estabelecimento não existe');
    }
    
    await estabelecimentoRepository.update(estabelecimento, usu_id)

  /*   return await estabelecimentoRepository.findOneByWhere(usu_id); */
}

const updateById =  async function(estabelecimento, id){
    console.log(estabelecimento)
    const thereIsEstabelecimento = await estabelecimentoRepository.findById(id)
    if(!thereIsEstabelecimento){
        return createError(404, 'Estabelecimento não existe');
    }

    await estabelecimentoRepository.updateById(estabelecimento, id)

 /*    return await estabelecimentoRepository.findById(id) */
}

const findAll = async function(){
    const estabelecimentos = await estabelecimentoRepository.findAll();
    return estabelecimentos;
}

const findById = async function(id){
    console.log(id)
    const estabelecimento = await estabelecimentoRepository.findById(id);

    if(!estabelecimento){
        return createError(404, "Estabelecimento não encontrado")
    }
    return estabelecimento;
}

const findByUserId = async function(id){
    console.log("ID usuario: " + id);
    const estabelecimento = await estabelecimentoRepository.findByWhereComDados({usu_id: id});
    if(!estabelecimento){
        return createError(404, "Estabelecimento não encontrado")
    }
    return estabelecimento;
}

const findByUrl = async function(estabelecimentoUrl){
    const estabelecimento = await estabelecimentoRepository.findByWhereComTudo({url: estabelecimentoUrl});
    if(!estabelecimento){
        return createError(404, "Estabelecimento não encontrado")
    }

    return estabelecimento;
}

const deletar = async function(id){
    const estabelecimento = await estabelecimentoRepository.findById(id);

    if(!estabelecimento){
        return createError(404, "Estabelecimento não encontrado")
    }
    await estabelecimentoRepository.deletar(id);
   /*  return estabelecimento; */
}

module.exports = {
    create,
    update,
    findAll,
    findById,
    findByUrl,
    updateById,
    findByUserId,
    deletar,
}