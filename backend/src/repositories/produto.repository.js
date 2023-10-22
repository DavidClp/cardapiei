const {Produto} = require('../database/models')

const create = async function(produto){
    const produtoCriado = await Produto.create(produto);
    return produtoCriado;
}

const update = async function(produto, id){
    const fieldsToUpdate = {};

    if (produto.nome !== null) {
        fieldsToUpdate.nome = produto.nome;
    }

    if (produto.valor !== null) {
        fieldsToUpdate.valor = produto.valor;
    }

    if (produto.descricao !== null) {
        fieldsToUpdate.descricao = produto.descricao;
    }

    if (produto.imagem !== null) {
        fieldsToUpdate.imagem = produto.imagem;
    }

    // Verifique se há campos para atualizar
 /*    if (Object.keys(fieldsToUpdate).length === 0) {
        return "Nenhum campo para atualizar.";
    } */

    await Produto.update(fieldsToUpdate, {
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