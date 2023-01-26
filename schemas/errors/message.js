const errors = {}

errors.nameRegex = "Tu nombre no debe tener numeros ni simbolos";
errors.nameString = "Tu nombre debe tener solo caracteres";
errors.nameMin = "Tu nombre debe de tener minimo 3 letras";
errors.surnameRegex = "Tu apellido no debe tener numeros ni simbolos";
errors.surnameString = "Tu apellido debe tener solo caracteres";
errors.surnameMin = "Tu apellido debe de tener minimo 3 letras";
errors.userNameRegex = "El username solo puede llevar estos simbolos \"-\" \"_\"";
errors.userName = "El username debe contener solo caracteres";
errors.userNameMin = "Tu username debe tener al menos 3 caracteres";
errors.productMin = "El nombre del producto debe tener al menos 3 letras";
errors.productPrice = "El precio debe de ir asi: $20.99";
errors.productDescription = "La descripcion debe de ser al menos de 10 caracteres";
errors.productRegex = "El nombre del producto solo debe llevar letras";
errors.emailRegex = "El email no cumple con los requerimientos";
errors.direction = "Tu direccion debe tener caracteres validos";
errors.card = "La tarjeta de debito debe tener 16 digitos";
errors.number = "Debe de ser un numero";
errors.integer = "Debe ser un entero";
errors.required = "El campo no puede quedar vacio";

module.exports = errors;
