# Node-API-REST
- [Creando servidor con Express](#express)
<h2 id="express">Creando mi primer servidor con Express</h2>

Para poder crear tu primer servidor con express debes tener instalado Node JS en tu ordenador.
Te dejo el [link](https://nodejs.org/es) de descarga.
Luego de la instalación de node crea una carpeta en tu ordenador en mi caso lo hare en _documentos/cursos/node-api-rest_ y dentro de esa carpeta creare un archivo _index.js_ que sera el principal.
1. Iniciamos _npm_:

```bash
npm init -y
```

2. Procedemos a instalar express y otras dependencias:

```bash
npm i eslint eslint-config-prettier eslint-plugin-prettier pritter -D
```
__Nota:__ te recomiendo instalar _nodemon_ de manera global:
```bash
npm i nodemon -g
```
3. Añadimos un archivo _.gitignore_ que lo dejare [aqui](./.gitignore).
4. Añadimos otros archivos de configuración para buenas prácticas:
    - Crear archivo _.eslinttrc.json_ con el siguiente contenido:
    ```json
    {
      "parserOptions": {
        "ecmaVersion": 2018
      },
      "extends": [
        "eslint:recommended",
        "prettier"
      ],
      "env": {
        "es6": true,
        "node": true,
        "jest": true
      },
      "rules": {
      "no-console": "warn"
      }
    }
    ```
    - Crear archivo _.editorconfig_ con el siguiente contenido:
    ```bash
    [*]
    charset = utf-8
    indent_style = space
    indent_size = 2
    insert_final_newline = true
    trim_trailing_whitespace = true

    [*.js]
    quote_type = single

    [*.md]
    max_line_length = off
    trim_trailing_whitespace = false
    ```
5. Por ultimo creamo nuestro archivo _index.js_ con el siguiente codigo:

  ```js
  const express = require('express');
  const data = require('./products.json');
  const app = express(); //usando constante de express
  const port = 3000;

  // definiendo rutas
  app.get('/', (request, response) => {
    response.writeHead(200,{'Content-Type':'text/html'});
    response.write("<h1>Login</h1>");
    console.log(request.url);
  })

  app.listen(port, function(){
    console.log(`Escuchando en: localhost:${port}/`);
  });
  ```
6. Creamos nuestros scripts para correr el servidor, nos vamos al archivo _package.json_ en el apartado de _"scripts"_ colocamos lo siguiente:
```json
  "dev": "nodemon ./index.js",
  "start": "node ./index.js",
  "lint": "eslint"
```
7. Nos dirigimos a la terminal y escribimos lo siguiente para poder tener un servidor que se reinicie con cambios que hagamos automaticamente:
  ```bash
  npm run dev
  ```

Aparecera un mensaje como este:
<div align="center">
  <img src="./imgs/server-express.PNG">
</div>
9. Nos vamos a nuestro navegador y escribimos esto:

<pre>localhost:3000</pre>
<div align="center">
  <img src="./imgs/url-express.PNG">
</div>
Y listo tenemos nuestro primer servido con _Express_
