const yup = require('yup');
const errors = require('./errors/message');
const { createUserValidation, updateUserValidation } = require('./user.schema');

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

function newCustomerValidation(data) {
    const schema = yup.object().shape({
        firstName: yup.string().required(),
        lastName: yup.string().required(),
        phone: yup.string().min(8),
        user: yup.object().shape(createUserValidation)
    });

    schema.validateSync(data);
}

function updateFindId(data){
    const schema = yup.object().shape({
        id: yup.number()
    });

    schema.validateSync(data);
}

function updateCustomerValidation(data) {
    const schema = yup.object().shape({
        firstName: yup.string(),
        lastName: yup.string(),
        phone: yup.string().min(8),
        userId: yup.number().integer()
    });

    schema.validateSync(data);
};

function deleteCustomerValidation(data) {
    const schema = yup.object().shape({
        id: yup.number().integer().required()
    });

    schema.validateSync(data);
}

function findCustomerValidation(data) {
    const schema = yup.object().shape({
        id: yup.number().integer().required()
    });

    schema.validateSync(data);
}

module.exports = {
    validate,
    newCustomerValidation,
    updateCustomerValidation,
    deleteCustomerValidation,
    findCustomerValidation
}