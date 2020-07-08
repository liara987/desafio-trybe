const express = require('express');
const router = express.Router();
const request = require('request');
const currency = require('../currencies.json');
const login = require('../middleware/login');

router.get('/btc', (req, res, next) => {
    request('https://api.coindesk.com/v1/bpi/currentprice/BTC.json', function (error, response, body) {
        const bodyJson = JSON.parse(body);
        const usdRateFloat = bodyJson.bpi.USD.rate_float;        
        bodyJson.BRL = {
            rate: (currency.BRL * usdRateFloat).toLocaleString('pt-BR'),
            description: "Brazilian Real",
            rate_float: currency.BRL * usdRateFloat
        };
        bodyJson.EUR = {
            code:'EUR',
            rate: (currency.EUR * usdRateFloat).toLocaleString('de-DE'),
            description: "Euro",
            rate_float: currency.EUR * usdRateFloat
        }
        bodyJson.CAD = {
            code:'CAD',
            rate: (currency.CAD * usdRateFloat).toLocaleString('en-CA'),
            description: "Canadian Dollar",
            rate_float: currency.CAD * usdRateFloat
        }

        res.status(200).send({
            body: bodyJson
        })
    });
})

router.post('/btc', login, (req, res, next) => {
    const cur = req.body.currency;
    const value = req.body.value;

    // verifica se os campos foram preenchidos
    if (cur === '' || value === '') {
        res.status(400).send({
            message: "Campos obrigatórios"
        })
    }

    // verifica se valor é inteiro e positivo
    if (Math.sign(value) !== 1 || !Number.isInteger(value)) {
        res.status(400).send({
            message: "Valor inválido"
        })
    }

    // verifica se a moeda é valida
    switch (cur) {
        case 'BRL':
            currency[cur] = value;            
            res.status(201).send({
                message: "Valor alterado com sucesso!"
            })
            break
        case 'EUR':
            currency[cur] = value;            
            res.status(201).send({
                message: "Valor alterado com sucesso!"
            })
            break
        case 'CAD':
            currency[cur] = value;            
            res.status(201).send({
                message: "Valor alterado com sucesso!"
            })
            break
        default:
            res.status(400).send({
                message: "Moeda inválida"
            })

    }
})

module.exports = router;
