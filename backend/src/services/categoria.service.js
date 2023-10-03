const categoriaRepository = require('../repositories/categoria.repository');
const createError = require('http-errors')

const create = async function(categoria){
    const thereCategoria = await categoriaRepository.findOneByWhere({nome: categoria.nome});
    if(thereCategoria){
        return createError(409,"Categoria já existe");
    }

    const categoriaCriado = await categoriaRepository.create(categoria);
    return categoriaCriado;
}

const update =  async function(categoria, id){
    const thereIsEstabelecimento = await categoriaRepository.findById(id)
    if(!thereIsEstabelecimento){
        return createError(404, 'Categoria não existe');
    }

    await categoriaRepository.update(categoria, id)

    return await categoriaRepository.findById(id)
}

const findAll = async function(){
    const categorias = await categoriaRepository.findAll();
    return categorias;
}

const findByEstId = async function(){
    const categorias = await categoriaRepository.findAllComProdutos();
    if(!categorias){
        return createError(404, "Categorias não encontrado");
    }
    return categorias;
}

const findById = async function(id){
    const categoria = await categoriaRepository.findById(id);

    if(!categoria){
        return createError(404, "Categoria não encontrado")
    }
    return categoria;
}

const deletar = async function(id){
    const categoria = await categoriaRepository.findById(id);

    if(!categoria){
        return createError(404, "Categoria não encontrado")
    }
    await categoriaRepository.deletar(id);
    return categoria;
}

module.exports = {
    create,
    update,
    findAll,
    findById,
    findByEstId,
    deletar,
}