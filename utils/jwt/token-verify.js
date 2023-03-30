require('dotenv').config();
const jwt = require('jsonwebtoken');

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsInJvbGUiOiJhZG1pbiIsImlhdCI6MTY4MDE5OTQwMn0.VMEwMSdtxzxhU7wGZsu_ZUebDc1ysfPWmcAew-2z3Nc';

function verifyToken(token, secret){
    return jwt.verify(token, secret); // verificar token
}

const payload = verifyToken(token, process.env.JWT_SECRET);
console.log(payload);