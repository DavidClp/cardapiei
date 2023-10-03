const {Usuario} = require('../database/models')

const create = async function(usuario){
    const usuarioCriado = await Usuario.create(usuario);
    return usuarioCriado;
}

const update = async function(usuario, id){
    await Usuario.update(usuario, {
        where: {id: id}
    });
}

const findAll = async function(){
    const usuarios = await Usuario.findAll();
    return usuarios;
}

const findById = async function(id){
    const usuario = await Usuario.findByPk(id);
    return usuario;
}

const findOneByWhere = async function(where){
    const usuario = await Usuario.findOne({
        where: where
    });
    return usuario;
}

const deletar = async function(id){
    return await Usuario.destroy({where: {id:id}});
}

module.exports = {
    create,
    update,
    findAll,
    findById,
    findOneByWhere,
    deletar
}