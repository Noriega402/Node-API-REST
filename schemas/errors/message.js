const errors = {}

errors.nameRegex = "Tu nombre no debe tener numeros ni simbolos";
errors.nameString = "Tu nombre debe tener solo caracteres";
errors.surnameRegex = "Tu apellido no debe tener numeros ni simbolos";
errors.surnameString = "Tu apellido debe tener solo caracteres";
errors.userNameRegex = "El username solo puede llevar estos simbolos \"-\" \"_\"";
errors.userName = "El username debe contener solo caracteres";
errors.emailRegex = "El email no cumple con los requerimientos";
errors.direction = "Tu direccion debe tener caracteres validos";
errors.card = "La tarjeta de debito debe tener 16 digitos";
errors.required = "El campo no puede quedar vacio";

module.exports = errors;
