const yup = require('yup');
const errors = require('./errors/message');

function validate(validation, property){
    return (request, response, next) => {
        try {
            validation(request[property]);
            next();
        } catch (error) {
            next(error);
            console.log(error);
        }
    }
}

function createCategoryValidation(data){
    const schema = yup.object().shape({
        name: yup
        .string()
        .required(errors.required),
    });
    schema.validateSync(data);
}

function updateCategoryValidation(data, property){
    const schema = yup.object().shape({
        name: yup
        .string()
        .required(errors.required),
    });
    schema.validateSync(data);
}

function deleteCategoryValidation(data){
    const schema = yup.object().shape({
        id: yup
        .number(errors.number)
        .integer(errors.integer)
        .required(errors.required),
    });
    schema.validateSync(data);
}

module.exports = {
    validate,
    createCategoryValidation,
    deleteCategoryValidation,
    updateCategoryValidation
}