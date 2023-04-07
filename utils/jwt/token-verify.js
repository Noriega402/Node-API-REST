const jwt = require('jsonwebtoken');

function verifyToken(token, secret){
    return jwt.verify(token, secret); // verificar token
}

// const payload = verifyToken(token, process.env.JWT_SECRET);
// console.log(payload);
module.exports = verifyToken;