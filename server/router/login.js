const express = require('express');
const router = express.Router();
var validator = require("email-validator");
const jwt = require("jsonwebtoken");

router.post('/', (req, res, next) => {
    const user = {
        email: req.body.email,
        password: req.body.password
    }
    const emailValido = validator.validate(user.email);
    const password = user.password;
    const passwordLen = Math.ceil(Math.log10(password + 1));

    // verifica se a senha é numerica
    if (!isNaN(password)) {
        
        // email valido e senha igual ou menor de 6
        if (passwordLen <= 6 && emailValido) {
            const token = jwt.sign({
                user
            }, 'JWT_KEY', {
                expiresIn: "1h"
            })
            res.status(201).send({
                token
            })
        } else {
            res.status(400).send({
                message: "Campos inválidos"
            })
        }
    } else {
        const erro = new Error('Senha deve ser numerica');
        erro.status = 406;
        next(erro);
    }
})

module.exports = router;