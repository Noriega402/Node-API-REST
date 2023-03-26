const yup = require('yup');
const errors = require('./errors/message');

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

function customerValidation(data) {
    const schema = yup.object().shape({
        customerId: yup.number("Debe ser un numero").integer("Debe ser un entero").required("El customerId es requerido"),
    });

    schema.validateSync(data);
}

function getOrderValidation(data) {
    const schema = yup.object().shape({
        id: yup.number("Debe ser un numero").integer("Debe ser un entero").required(),
    })

    schema.validateSync(data);
}

function idOrderValidation(data) {
    const schema = yup.object().shape({
        id: yup.number("Debe ser un numero").integer("Debe ser un entero").required(errors.required),
    });
}

function addItem(data) {
    const schema = yup.object().shape({
        orderId: yup.number("Debe de ser un numero")
            .integer("Debe de ser un entero")
            .required(),
        productId: yup.number("Debe de ser un numero")
            .integer("Debe de ser un entero")
            .required(),
        quantity: yup.number("Debe de ser un numero")
            .integer("Debe de ser un entero")
            .positive("Debe de ser un numero positivo")
            .required(),
    });

    schema.validateSync(data);
}

module.exports = {
    validate,
    customerValidation,
    getOrderValidation,
    idOrderValidation,
    addItem,
}