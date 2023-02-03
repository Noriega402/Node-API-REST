const bcrypt = require('bcrypt');

let password = 'admin10$';

bcrypt.hash(password,10, function(err, hash){
  if(err){
    console.error("Hubo un error al cifrar el password");
  }else{
    console.log(hash);
    console.log("Comprobando informacion...");
    bcrypt.compare('admin10$', hash, function(err, response){
      setTimeout(() => {
        if(!response){
          console.error("Las credenciales no coinciden...")
        }else{
          console.log("Usuario aceptado");
          console.log(response);
        }
      }, 2000);
    });
  }
});
