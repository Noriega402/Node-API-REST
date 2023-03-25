const yup = require('yup');
const errors = require('./errors/message');
const regexProduct = /^[a-zA-Z\s]+/gi;
const regexPrice = /\$[0-9]+\.[0-9]+/gi;

function validate(validation, property) {
  return (request, response, next) => {
    try {
      //request[property] es para obtener los datos de body, params o query
      validation(request[property]);
      next();
    } catch (error) {
      next(error);
      console.log(error);
    }
  }
}

function createProductValidation(data) {
  const schema = yup.object().shape({
    name: yup.string()
    .min(3, errors.productMin)
    .matches(regexProduct, errors.productRegex)
    .required(errors.required),
    price: yup.number().positive().required(),
    description: yup.string()
    .min(10, errors.productDescription)
    .required(errors.required),
    image: yup.string()
    .url()
    .required(errors.required),
    categoryId: yup.number().integer().required(),
  });

  schema.validateSync(data);
}

function updateProductValidation(data, property) {
  const schema = yup.object().shape({
    product: yup.string()
    .min(3, errors.productMin)
    .matches(regexProduct, errors.productRegex),
    price: yup.number().positive(),
    description: yup.string().min(10, errors.productDescription),
    categoryId: yup.number().integer(),
  });

  schema.validateSync(data);
}

function deleteProductValidation(data, property) {
  const schema = yup.object().shape({
    id: yup.number(errors.number).integer(errors.integer).required(errors.required),
  });

  schema.validateSync(data);
}

module.exports = {
  validate,
  createProductValidation,
  updateProductValidation,
  deleteProductValidation
};
