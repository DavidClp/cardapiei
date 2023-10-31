require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const handle404Error = require('./src/middlewares/handle404Error');
const handleError = require('./src/middlewares/handleError');
const cors = require('cors');
const app = express();

const usuarioRoute = require('./src/routes/usuario.route');
const estabelecimentoRoute = require('./src/routes/estabelecimento.route');
const categoriaRoute = require('./src/routes/categoria.route');
const produtoRoute = require('./src/routes/produto.route');
const localizacaoRoute = require('./src/routes/localizacao.route');
const contatoRoute = require('./src/routes/contato.route');
const horarioRoute = require('./src/routes/horario.route');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
/* app.use(cors({
    origin: 'http://localhost:3000', // Altere para o domínio do seu frontend
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // Habilitar cookies, se necessário
})); */
app.use(cors({
    origin: '*', // Altere para o domínio do seu frontend
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // Habilitar cookies, se necessário
}));

app.use('/api/usuarios', usuarioRoute);
app.use('/api/estabelecimentos', estabelecimentoRoute);
app.use('/api/categorias', categoriaRoute);
app.use('/api/produtos', produtoRoute);
app.use('/api/localizacao', localizacaoRoute);
app.use('/api/contatos', contatoRoute);
app.use('/api/horarios', horarioRoute);

app.use(handle404Error);
app.use(handleError);

app.listen(process.env.PORT, () => {console.log('API Rodando na porta '+ process.env.PORT)})