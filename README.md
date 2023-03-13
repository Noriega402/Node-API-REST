# Node-API-REST
- [Creando servidor con Express](#express)
- [Iniciar con Docker compose](#pasos-para-iniciar-docker-con-node)

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

Y listo tenemos nuestro primer servidor con _Express_


## Pasos para iniciar docker con node
Crear el archivo de docker-compose
```bash
touch docker-compose.yml
```

Abrimos VS Code
```bash
code .
```

Colocamos dentro del archivo de docker-compose lo siguiente para administrarlo sin necesidad de instalar drivers o aplicaciones de mas

```bash
version: '3.3'

services:
  postgres:
    image: postgres:15
    environment:
      - POSTGRES_DB=store
      - POSTGRES_USER=noriega
      - POSTGRES_PASSWORD=server2023$
    ports:
      - 5432:5432
    volumes:
      - ./postgres_data:/var/lib/postgresql/data
```

## Crear contenedor con docker-compose
Luego de tener tu configuracion realizaremos lo siguiente dentro de la linea de comandos (terminal):

```bash
docker-compose up -d postgres
```

__NOTA:__ postgres es porque ese el nombre del servicio en caso pusieras otro lo cambias

Verificaremos si esta corriendo el contenedor

```bash
docker-compose -ps
```

Para parar el contenedor hacemos lo siguiente

```bash
docker-compose down
```

## Explorando terminal e interfaz de postgres
Primero lo veremos desde la terminal y usaremos el siguiente comando:

```bash
docker-compose exec postgres bash
```

Nos conectara a la base de datos vía terminal

Para navegar dentro de ella:
```bash
ls -l
```

### Conectarse a la base de datos por terminal
Colocaremos esto una vez estemos dentro del contenedro de postgres

```bash
psql -h localhost -d store -U noriega
```

__NOTA:__ -h es para indicar el host, -d para indicar la base de datos y -U es para indicar el nombre de usuario

### Conectarse por medio de PGAdmin4

En caso no nos sintamos muy comodos utilizando la base de datos por medio de la terminal podemos hacerlo por medio de PGAdmin4, pero tendremos que realizar unas configuraciones mas a al archivo de _docker-compose.yml_ agregaremos un servicio más.

```bash
version: "3.3"

services:
  postgres:
    image: postgres:15
    environment:
      - POSTGRES_DB=store
      - POSTGRES_USER=noriega
      - POSTGRES_PASSWORD=server2023$
    ports:
      - 5432:5432
    volumes:
      - ./postgres_data:/var/lib/postgresql/data

  pgadmin:
    image: dpage/pgadmin4
    environment:
      - PGADMIN_DEFAULT_EMAIL=admin@gmail.com
      - PGADMIN_DEFAULT_PASSWORD=root
    ports:
      - 5050:80
```

Ahora tendremos que hacer que pgadmin corra en un contenedor.

```bash
docker-compose up -d pgadmin
```

Justo ahora tendriamos que tener dos servicios: el de la base de datos de postgresql y pgadmin4.

## Integracion de postgres con node

Para poder conectar directamente Node con postgres nos dirigiremos a la siguiente [documentación](https://node-postgres.com) en donde encontraremos los pasos para poder realizar la conexión

### Instalación de PG

Para poder hacer que node se conecte con postgres necesitaremos de una libreria llamada _pg_

```bash
npm i pg
```

Para tener un mayor orden en el código podemos crear una carpeta llamada _libs_ donde estaremos guardando configuraciones para librerias que utilizaremos (conexion a terceros DB o APIS).

```bash
mkdir libs
```

Dentro de ella agregaremos un archivo llamado _postgres.js_

```bash
touch postgres.js
```

Realizamos los cambios dentro del archivo
```js
const { Client } = require('pg');


async function getConnection(){

  const client = new Client({
    host: 'localhost',
    port: 5432,
    user: 'noriega',
    password: 'server2023$',
    database: 'store'
  });

  await client.connect();
  return client;
}

module.exports = getConnection();
```

__NOTA:__ la libreria necesita usar _async/await_

### Crear un pool de conexiones

El capitulo anterior vimos que podemos crear una conexion por medio de node y postgres, pero no es una forma tan optima, porque si hay varios usuarios dentro de nuestra app, necesitaremos tener varias conexiones para ellos, entonce aqi entran las _pool connection_ y lo hacemos de la siguiente manera:

Creamos un nuevo archivo llamado _postgres.pool.js_ dentro de la carpeta _libs_

```bash
cd libs
```

```bash
touch postgres.pool.js
```

Dentro del archivo de _postgres.pool.js_ agregamos el siguiente codigo

```js
const { Pool } = require('pg');

const pool = new Pool({
  host: 'localhost',
  port: 5432,
  user: 'noriega',
  password: 'server2023$',
  database: 'store'
});

module.exports = pool;
```

Luego de esto nos dirigimos a nuestra carpeta _controllers_ y creamos un nuevo archivo para realizar las pruebas de conexion a la base de datos.

```js
const pool = requite('../libs/postregres.pool');
const controller {}

controller.getTasks = async (request, response) => {
  const query = 'SELECT *FROM tasks';
  pool.on('error', err => console.error(err)); //en caso de un error de conexion
  const getResult = await pool.query(query);
  return response.json(getResult.rows);
}

module.exports = controller;
```

Procedemos a agregar un archivo nuevas rutas dentro de nuestra carpeta _routers_ al archivo _test.router.js_ para poder hacer uso de esta direccion en la web

```js
const express = require('express');
const router = express.Router();
const controller = require('../controllers/tasks.controller');

router.get('/', controller.getTasks);

module.exports = router;
```

### Variables de ambiente con node

De las maneras que se utilizaron para realizar conexiones y consultas a la base de datos es necesario saber que es una mala practica colocar __datos sensibles__ en caso alguien logre interceptar las credenciales a la DB se corre un riesgo, para eso utilizaremos node para crear variables de ambiente

Creamos una carpeta llamada _config_, luego dentro de esa carpeta creamos un archivo llamado _config.js_ para lograr hacer las configuraciones de las variables de ambiente.

```bash
mkdir config
```

```bash
touch config.js
```

Dentro del archivo config colocaremos lo siguiente

```js
require('dotenv').config();

const config = {
    env: process.env.NODE_ENV || 'dev',
    port: process.env.NODE_PORT || 3000,
    dbUser: process.env.DB_USER,
    dbPassword: process.env.DB_PASSWORD,
    dbHost: process.env.DB_HOST,
    dbName: process.env.DB_NAME,
    dbPort: process.env.DB_PORT,
}

module.exports =  { config };
```

__NOTA:__ para que esto funcione debes descargar la libreria de ___dotenv___ para poder acceder a las variables de ambiente.

Luego dentro de la carpeta _libs_ en el archivo de _postgres.pool.js_ debemos de colocar el siguiente codigo.

```js
const { Pool } = require('pg');

const { config } = require('../config/config');

const USER = encodeURIComponent(config.dbUser);
const PASSWORD = encodeURIComponent(config.dbPassword);
const URI = `postgres://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`;

const pool = new Pool({ connectionString: URI });

module.exports = pool;
```

Creas un archivo _.env_ para poder hacer la busqueda de las variables de ambiente con node

```bash
touch .env
```

Dentro del archivo _.env_ se deberia de ver algo asi:

```bash
PORT=3000
DB_USER='noriega'
DB_PASSWORD='server2023$'
DB_HOST='localhost'
DB_NAME='store'
DB_PORT='5432'
```

Por ultimo volvemos a correr la aplicacion

```bash
npm run dev
```

Realizamo la consulta por medio de _postman_, _insomnia_ o _thunder client_ de la siguiente manera:

```bash
http://localhost:3000/api/v1/task
```

Tendremos nuestros datos para poder visualizar la consulta realizada con las variables de entorno.

## Instalacion y configuración de Sequelize (ORM)

Para iniciar debemos de saber lo más simple, ¿Qué es un ORM? lo explicaremos de manera sencilla, un __ORM (Object Relational Model)__ transforma y mapea a nuestra DB con metodos de la programacion orientada a objetos, se ejecutan metodos a travez de consultas
### Ventaja de usar un ORM

Es agnóstico, no importa si se esta usando MYSQL, PostgreSQL, MariaDB, Oracle, etc, siempre y cuando la DB use SQL.

Para instalar sequelize en nuestro proyecto haremos uso de lo siguinte

```bash
npm install --save pg pghstore
```

Ya que se esta trabajando con postgres en caso de utilzar otras DB podemos ver la [documentacion oficial](https://sequelize.org/docs/v6/getting-started/) de sequelize

Luego de instalar la libreria de sequelize, dentro de la carpeta de _libs_ crearemos un archivo llamado _sequelize.js_ para nuestra conexión con node.

```js
const { Sequelize } = require('sequelize');
const { config } =  require('../config/config');

const USER = encodeURIComponent(config.dbUser);
const PASSWORD = encodeURIComponent(config.dbPassword);
const URI = `postgres://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`;

/**
 * @logging hay dos opciones true o false, en caso de dar un error colocar console.log
 * @dialect indicar a que DB nos vamos a conectar
 */
const sequelize = new Sequelize(URI, {
    dialect: 'postgres',
    logging: console.log,
});

module.exports = sequelize;
```

Luego de eso procedemos a ir a nuestro archivo de _task.controller.js_ en la carpeta de _controllers_ y agregaremos una funcion para probar el ORM.

__NOTA:__ el archivo que modificaremos tendrá codigo de una conexión con ___pool___ es opcional dejarlo o no, solo esa para fines educativos (en nuestro caso lo eliminaremos).

```js
const sequelize = require('../libs/sequelize');
const controller = {};

controller.getTasksSequelize = async (request, response) => {
    const query = 'SELECT *FROM tasks';
    const [data, metadata] = await sequelize.query(query);
    return response.json(data);
}

module.exports = controller;
```

Luego iremos a la carpeta _routes_ para crear la ruta de la nueva consulta en el archivo de _test.router.js_

```js
const express = require('express');
const router = express.Router();
const controller = require('../controllers/tasks.controller');

router.get('/sequelize', controller.getTasksSequelize);

module.exports = router;
```

Y para comprobar que esta funcionando, corremos nuestra app.

```bash
npm run dev
```

Luego nos dirigimos a _postman_ para realizar la consulta a la siguiente direccion

```bash
http://localhost:3000/api/v1/test/sequelize
```

Y listo, tenemos nuestra primera consulta con el __ORM__

## Primer modelo con sequelize

Para crear un modelo con sequelize hay varias formas y son mediante clases y herencias, pero por el momento veremos una de ellas. Crearemos una carpeta llamada _db_ dentro de ella crearemos otra carpeta llamada _models_.

Dentro de la carpeta models creamos un archivo llamado _user.model.js_ y dentro de el agregaremos el siguiente codigo

```js
const { Model, DataTypes, Sequelize } = require('sequelize');

// buena paractica para definir cual sera el nombre de nuestra tabla
const USER_TABLE = 'users';

//crear el esquema que queremos que haga la DB
const UserSchema = {
    id: {
        allowNull: false, //permitir que el campo sea o no nulo
        autoIncrement: true, //campo incrementable
        primaryKey: true, // llave primaria
        type: DataTypes.INTEGER, // que tipo de valor recibira
    },
    email: {
        allowNull: false,
        type: DataTypes.STRING,
        unique: true, //tipo de campo unico
    },
    password: {
        allowNull: false,
        type: DataTypes.STRING
    },
    createdAt: { //
        allowNull: false,
        type: DataTypes.DATE,
        field: 'created_at', //definir el nombre de la columna
        defaultValue: Sequelize.NOW //insertar fecha por fecto
    }
};

class User extends Model {
    static associate() {
        //models = definiendo todas las relaciones
    }

    static config(sequelize){
        return {
            sequelize,
            tableName: USER_TABLE,
            modelName: 'User',
            timestamps: false,
        }
    }
}

module.exports = { USER_TABLE, UserSchema, User }
```

Ahora crearemos en la misma carpeta un archivo llamado _index.js_ con el siguiente codigo

```js
//Se encarga de enviar la conexion hacia los modelos para hacer el mapeo de datos
const { User, UserSchema } = require('./user.model');

function setupModels(sequelize){
    User.init(UserSchema, User.config(sequelize)); //enviar un modelo de esquema y configuracion
}

module.exports = setupModels;
```

Ahora editaremos de nuevo el archivo _sequelize.js_ de la conexión con la DB _(libs/sequelize.js)_

```js
const { Sequelize }= require('sequelize');
const { config } =  require('../config/config');
const setupModels =  require('../db/models');

const USER = encodeURIComponent(config.dbUser);
const PASSWORD = encodeURIComponent(config.dbPassword);
const URI = `postgres://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`;

/**
 * @logging hay dos opciones true o false, en caso de dar un error colocar console.log
 * @dialect indicar a que DB nos vamos a conectar
 */
const sequelize = new Sequelize(URI, {
    dialect: 'postgres',
    logging: console.log,
});

setupModels(sequelize); //enviando conexion

// hacer una sincronizacion de las comlumnas de las tablas
sequelize.sync();

module.exports = sequelize;
```

Ahora editaremos el archivo de _users.controller.js_ que se encuentra en la carpeta _controller_

__NOTA:__ solo agregaremos una linea al principio del archivo y editaremos la funcion __getUsers__

```js
const { models } = require('../libs/sequelize');

controller.getUsers = async (request, response) => {
  const { size } = request.query;
  const datos = [];
  const limit = size || 10;

  // User viene del archivo user.model.js dentro de la clase de User en el metodo estatico hay un valor llamado modelName:User
  const rows = await models.User.findAll();
  return response.json(rows);
}
```

Si nosotros ingresamo a la ruta para poder ver a los usuarios que estan registrados.

```bash
http://localhost:3000/api/v1/users
```

No tendremos nada de información, porque la tabla aun esta vacia, entonces agregaremos datos dentro de __pgadmin__

```sql
INSERT INTO public.users(email, password, created_at)
	VALUES ('dnoriega@gmail.com', 'admin123', NOW()),
	('cindyardon@gmail.com','cindy123',NOW()),
	('msalazar@gmail.com','msalazar123', NOW()),
	('fgourlay2@gov.uk','test',NOW()),
	('servidor@microsoft.com','servidor123',NOW()),
	('platzi@platzi.com','platzi123',NOW());

SELECT *FROM public.users;

-- VACIAR LA TABLA
TRUNCATE TABLE public.users;

-- REINICIAR ID DESDE 1
ALTER SEQUENCE users_id_seq RESTART WITH 1;
```

Y listo podremos probar que los datos si estan recibiendo.