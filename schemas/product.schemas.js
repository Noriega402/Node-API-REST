const yup = require('yup');

function validate(validation){
  return (request, response, next) => {
    try {
      validation(request.body);
      next();
    } catch (error) {
      next(error);
      console.log(error);
    }
  }
}

function createProductValidation(data){
  const regexProduct = /^[a-zA-Z]+$/gi;
  const regexPrice = /\$[0-9]+\.[0-9]+/gi;

  const schema = yup.object().shape({
    product: yup.string().min(3, "El producto debe tener mas de 3 caracteres").matches(regexProduct).required("Es necesario ingresar un producto"),
    price: yup.string().matches(regexPrice).required(),
    description: yup.string().min(10).required(),
  });

  schema.validateSync(data);
}

module.exports = {
  validate,
  createProductValidation
};
