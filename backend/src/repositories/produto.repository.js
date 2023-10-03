const {Produto} = require('../database/models')

const create = async function(produto){
    const produtoCriado = await Produto.create(produto);
    return produtoCriado;
}

const update = async function(produto, id){
    await produto.update(produto, {
        where: {id: id}
    });
}

const findAll = async function(){
    const produtos = await Produto.findAll();
    return produtos;
}

const findById = async function(id){
    const produto = await Produto.findByPk(id);
    return produto;
}

const findOneByWhere = async function(where){
    const produto = await Produto.findOne({
        where: where
    });
    return produto;
}

const findAllByWhere = async function(where){
    const produto = await Produto.findAll({
        where: where
    });
    return produto;
}

const deletar = async function(id){
    return await Produto.destroy({where: {id:id}});
}

module.exports = {
    create,
    update,
    findAll,
    findAllByWhere,
    findById,
    findOneByWhere,
    deletar
}