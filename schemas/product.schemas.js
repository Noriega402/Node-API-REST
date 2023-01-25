const yup = require('yup');

function validate(validation){
  return (request, response, next) => {
    try {
      validation(request.body);
      // console.log(request.body);
      next();
    } catch (error) {
      next(error);
      console.log(error);
    }
  }
}

function createProductValidation(data){
  const schema = yup.object().shape({
    products: yup.string().min(3, "El producto debe tener mas de 3 caracteres").required("Es necesario ingresar un producto"),
    price: yup.string().required(),
    description: yup.string().min(10).required(),
  });

  schema.validateSync(data);
}

module.exports = {
  validate,
  createProductValidation
};
