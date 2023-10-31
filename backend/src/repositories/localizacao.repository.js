const {Localizacao} = require('../database/models')

const create = async function(localizacao){
    const localizacaoCriado = await Localizacao.create(localizacao);
    return localizacaoCriado;
}

const update = async function(localizacao, id){
    const fieldsToUpdate = {
        cep: localizacao.cep ?? undefined,
        endereco: localizacao.endereco ?? undefined,
        numero: localizacao.numero ?? undefined,
        bairro: localizacao.bairro ?? undefined,
        cidade: localizacao.cidade ?? undefined,

      };
    await Localizacao.update(fieldsToUpdate, {
        where: {id: id}
    });
}

const updateByEstId = async function(localizacao, id){
    await Localizacao.update(localizacao, {
        where: {est_id: id}
    });
}

const findAll = async function(){
    const localizacaos = await Localizacao.findAll();
    return localizacaos;
}

const findById = async function(id){
    const localizacao = await Localizacao.findByPk(id);
    return localizacao;
}

const findOneByWhere = async function(where){
    const localizacao = await Localizacao.findOne({
        where: where
    });
    return localizacao;
}

const deletar = async function(id){
    return await Localizacao.destroy({where: {id:id}});
}

module.exports = {
    create,
    update,
    updateByEstId,
    findAll,
    findById,
    findOneByWhere,
    deletar
}