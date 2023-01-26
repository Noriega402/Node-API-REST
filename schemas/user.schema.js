const yup = require('yup');
const errors = require('./errors/message');

function validate(validation){
  return (request, response, next) => {
    try {
      validation(request.body);
      next();
    } catch (error) {
      next(error);
      console.log(error.message);
    }
  }
}

function createUserValidation(data) {
  const regexNames = /^[a-zA-Z]+$/gi;
  const regexMail = /^[a-zA-z0-9_.]+@[a-zA-Z0-9-_]+\.[a-zA-Z]{2,4}/gi;
  const regexUserName = /^[a-zA-Z0-9-_]+/gi;
  const regexCard = /^[0-9]+$/gi;

  const schema = yup.object().shape({
    first_name: yup
                .string(errors.nameString)
                .matches(regexNames, errors.nameRegex)
                .required(errors.required),
    last_name: yup
              .string(errors.surnameString)
              .matches(regexNames, errors.surnameRegex)
              .required(errors.required),
    user_name: yup
              .string(errors.userName)
              .matches(regexUserName, errors.userNameRegex)
              .required(errors.required),
    email: yup
          .string()
          .matches(regexMail, errors.emailRegex)
          .required(errors.required),
    direction: yup.string(errors.direction),
    credit_card: yup
                .string()
                .min(16, errors.card)
                .max(16, errors.card)
                .matches(regexCard),
  });

  schema.validateSync(data);
}

module.exports = {
  validate,
  createUserValidation
}
