const {horario_atendimento} = require('../database/models')

const create = async function(horario){
    const horarioCriado = await horario_atendimento.create(horario);
    return horarioCriado;
}

const update = async function(horario, id){
    await horario_atendimento.update(horario, {
        where: {id: id}
    });
}

const findAll = async function(){
    const Horarios = await horario_atendimento.findAll();
    return Horarios;
}

const findById = async function(id){
    const Horario = await horario_atendimento.findByPk(id);
    return Horario;
}

const findOneByWhere = async function(where){
    const horario = await horario_atendimento.findOne({
        where: where
    });
    return horario;
}

const findAllByWhere = async function(where){
    const horarios = await horario_atendimento.findAll({
        where: where
    });
    return horarios;
}

const deletar = async function(id){
    return await horario_atendimento.destroy({where: {id:id}});
}

module.exports = {
    create,
    update,
    findAll,
    findById,
    findAllByWhere,
    findOneByWhere,
    deletar
}