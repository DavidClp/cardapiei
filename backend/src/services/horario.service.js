const horarioRepository = require('../repositories/horario.repository');
const createError = require('http-errors')

const create = async function(horario){
    const horarioCriado = await horarioRepository.create(horario);
    return horarioCriado;
}

const update =  async function(horario, id){
    const thereIsEstabelecimento = await horarioRepository.findById(id)
    if(!thereIsEstabelecimento){
        return createError(404, 'Horario não existe');
    }

    await horarioRepository.update(horario, id)

    return await horarioRepository.findById(id)
}

const findAll = async function(){
    const horarios = await horarioRepository.findAll();
    return horarios;
}

const findById = async function(id){
    const horario = await horarioRepository.findById(id);

    if(!horario){
        return createError(404, "Horario não encontrado")
    }
    return horario;
}

const findByEstId = async function(id){
    const horario = await horarioRepository.findAllByWhere({est_id: id});

    /* if(!horario){
        return createError(404, "Horario não encontrado")
    } */
    return horario;
}

const deletar = async function(id){
    const horario = await horarioRepository.findById(id);

    if(!horario){
        return createError(404, "Horario não encontrado")
    }
    await horarioRepository.deletar(id);
    return horario;
}

module.exports = {
    create,
    update,
    findAll,
    findByEstId,
    findById,
    deletar,
}