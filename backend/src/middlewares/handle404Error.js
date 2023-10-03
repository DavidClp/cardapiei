const handle404Error = function(req, res){
    res.status(404);
    res.send(['pagina Não encontrado']);
}

module.exports = handle404Error;