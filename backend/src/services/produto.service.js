const produtoRepository = require('../repositories/produto.repository');
const createError = require('http-errors')
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/'); // Pasta onde as imagens serão armazenadas
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + '-' + file.originalname); // Nome único para o arquivo
    },
  });
  
  const upload = multer({ storage: storage });

const create = async function(produto){
    const produtoCriado = await produtoRepository.create(produto);
    return produtoCriado;
}

const update =  async function(produto, id){
    const thereIsProduto = await produtoRepository.findById(id)
    if(!thereIsProduto){
        return createError(404, 'Produto não existe');
    }
    await produtoRepository.update(produto, id)

    /* return await produtoRepository.findById(id) */
}

const updateSituacao =  async function(produto, id){
    const thereIsProduto = await produtoRepository.findById(id)
    if(!thereIsProduto){
        return createError(404, 'Produto não existe');
    }
    await produtoRepository.update(produto, id)
/*     return await produtoRepository.findById(id) */
}

const findAll = async function(){
    const produtos = await produtoRepository.findAll();
    return produtos;
}

const findById = async function(id){
    const produto = await produtoRepository.findById(id);

    if(!produto){
        return createError(404, "Produto não encontrado")
    }  
    return produto;
}

const findByCatId = async function(cat_id){
    const produtos = await produtoRepository.findAllByWhere({cat_id: cat_id});
    if(!produtos){
        return createError(404, "Produtos não encontrado")
    }

    return produtos;
}

const deletar = async function(id){
    const produto = await produtoRepository.findById(id);

    if(!produto){
        return createError(404, "Produto não encontrado")
    }
    await produtoRepository.deletar(id);
    return produto;
}

module.exports = {
    create,
    update,
    findByCatId,
    findAll,
    findById,
    deletar,
    updateSituacao,
}