const express = require('express');
const app = express();

const loginRouter = require('./router/login');
const btcRouter = require('./router/cotacao-cambio');
const morgan = require('morgan');
const bodyParser = require('body-parser');

// retorna log de status e request
app.use(morgan('dev'));

// aceita apenas dados simples
app.use(bodyParser.urlencoded({ extended: false })) 

// só aceita formato json de entrada
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
        'Access-Control-Allow-Header',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization',
    );

    if(req.method === "OPTIONS"){
        res.header('Access-Control-Allow-Method', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).send({});
    }

    next();
})

app.use('/login', loginRouter);
app.use('/crypto', btcRouter);

// rota não encontrada
app.use((req, res, next) => {
    const erro = new Error('Endpoint não encontrado');
    erro.status = 404;
    next(erro);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    return res.send({
        erro: {
            mensagem: error.message
        }
    })
})

module.exports = app;