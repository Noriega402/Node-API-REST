const yup = require('yup');
const errors = require('./errors/message');
const bcrypt = require('bcrypt');
const regexNames = /^[a-zA-Z]+$/gi;
const regexMail = /^[a-zA-z0-9_.]+@[a-zA-Z0-9-_]+\.[a-zA-Z]{2,4}/gi;
const regexPassword = /^[a-zA-z0-9$%&#!]{8,15}$/gm;

function validate(validation, property) {
    return (request, response, next) => {
        try {
            //request[property] es para obtener los datos de body, params o query
            validation(request[property]);
            next();
        } catch (error) {
            next(error);
            console.log(error.message);
        }
    }
}

function newPasswordValidation(data) {
    const schema = yup.object().shape({
        password: yup.string().min(8).matches(regexPassword, "Tu password solo puede tener caracteres alfanumericos o alguno de estos signos -> $%&#!")
    });

    schema.validateSync(data);
}

module.exports = {
    validate,
    newPasswordValidation
}
