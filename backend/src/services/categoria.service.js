const categoriaRepository = require('../repositories/categoria.repository');
const createError = require('http-errors')

const create = async function(categoria){
    const categoriaCriado = await categoriaRepository.create(categoria);
    console.log(categoriaCriado)
    return categoriaCriado;
}

const update =  async function(categoria, id){
    const thereIsCategoria = await categoriaRepository.findById(id)
    if(!thereIsCategoria){
        return createError(404, 'Categoria não existe');
    }

    await categoriaRepository.update(categoria, id)

    //return await categoriaRepository.findById(id)
}

const updateSituacao =  async function(situacao, id){
    const thereIsCategoria = await categoriaRepository.findById(id)
    if(!thereIsCategoria){
        return createError(404, 'Categoria não existe');
    }

    await categoriaRepository.update(situacao, id)

   // return await categoriaRepository.findById(id)
}

const findAll = async function(){
    const categorias = await categoriaRepository.findAll();
    return categorias;
}

const findByEstId = async function(id){
    const categorias = await categoriaRepository.findAllComProdutos(id);
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
    updateSituacao,
    findById,
    findByEstId,
    deletar,
}