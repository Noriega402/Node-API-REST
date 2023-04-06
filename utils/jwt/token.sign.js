require('dotenv').config();
const jwt = require('jsonwebtoken');
const moment =require('moment');

const signToken = (payload, secret) => {
    return jwt.sign({
        sub: payload.id,
        role: payload.role,
        iat: moment().unix(),
        expiresIn: moment().add(1,'hour') //expiracion en 20 minutos
    }, secret);
}

// const token = signToken(payload, process.env.JWT_TOKEN);
module.exports = signToken;