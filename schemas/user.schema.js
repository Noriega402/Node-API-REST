const yup = require('yup');
const errors = require('./errors/message');
const regexNames = /^[a-zA-Z]+$/gi;
const regexMail = /^[a-zA-z0-9_.]+@[a-zA-Z0-9-_]+\.[a-zA-Z]{2,4}/gi;
const regexUserName = /^[a-zA-Z0-9-_]+/gi;
const regexCard = /^[0-9]+$/gi;
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

function createUserValidation(data) {
  const schema = yup.object().shape({
    username: yup
      .string(errors.userName)
      .matches(regexUserName, errors.userNameRegex)
      .required(errors.required),
    email: yup
      .string()
      .matches(regexMail, errors.emailRegex)
      .required(errors.required),
    password: yup
      .string()
      .matches(regexPassword, "Debe de tener minimo 8 caracteres (simbolos y letras)")
      .required(errors.required),
    role: yup
      .string()
      .min(4, "debe tener como minimo 4 caracteres"),

  });

  schema.validateSync(data);
}

function updateUserValidation(data) {
  const schema = yup.object().shape({
    username: yup
      .string(errors.userName)
      .min(3, errors.userNameMin)
      .matches(regexUserName, errors.userNameRegex),
    email: yup
      .string()
      .matches(regexMail, errors.emailRegex),
    password: yup
      .string(),
    role: yup
      .string(),
  });

  schema.validateSync(data);
}

function deleteUserValidation(data) {
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
  createUserValidation,
  updateUserValidation,
  deleteUserValidation
}
