const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const token =  req.headers.authorization.split(' ')[1]
    try {
        const decode = jwt.verify(token, 'JWT_KEY');        
        next();
    } catch (error) {
        return res.status(401).send({
            message: "Token inválido"
        })
    }
}