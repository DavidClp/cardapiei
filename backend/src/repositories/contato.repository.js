const {Contato} = require('../database/models')

const create = async function(contato){
    const contatoCriado = await Contato.create(contato);
    return contatoCriado;
}

const update = async function(contato, id){
    await Contato.update(contato, {
        where: {id: id}
    });
}

const findAll = async function(){
    const contatos = await Contato.findAll();
    return contatos;
}

const findById = async function(id){
    const contato = await Contato.findByPk(id);
    return contato;
}

const findOneByWhere = async function(where){
    const contato = await Contato.findOne({
        where: where
    });
    return contato;
}

const findAllByWhere = async function(where){
    const contatos = await Contato.findAll({
        where: where
    });
    return contatos;
}

const deletar = async function(id){
    return await Contato.destroy({where: {id:id}});
}

module.exports = {
    create,
    update,
    findAll,
    findById,
    findOneByWhere,
    findAllByWhere,
    deletar
}