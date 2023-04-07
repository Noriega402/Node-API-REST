require('dotenv').config();
const jwt = require('jsonwebtoken');
const moment =require('moment');

const signToken = (payload, secret) => {
    return jwt.sign({
        sub: payload.id,
        role: payload.role,
        iat: moment().unix(),
        expiresIn: moment().add(30,'minutes') //expiracion en 30 minutos
    }, secret);
}

const signTokenRecovery = (payload, secret) => {
    return jwt.sign({
        sub: payload,
        iat: moment().unix(),
        expiresIn: moment().add(10,'minutes')
    }, secret)
}

// const token = signToken(payload, process.env.JWT_TOKEN);
module.exports = { signToken, signTokenRecovery };