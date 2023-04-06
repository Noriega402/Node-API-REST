# Node-API-REST

- [Creando servidor con Express](#instalación)
- [Iniciar con Docker compose](#iniciar-app-con-docker-compose)
- [Diagrama ER Base de datos](#diagrama-de-la-base-de-datos)

## Instalación
```
npm install
```

## Iniciar app con docker compose

```bash
docker-compose up -d
```
**NOTA:** en caso requieras ver los logs con docker, quita el "-d" del comando

Verificaremos si esta corriendo el contenedor

```bash
docker-compose -ps
```

Para parar la app hacemos lo siguiente

```bash
docker-compose down
```

## Diagrama de la base de datos

![Diagrama ER en PostgreSQL](https://github.com/Noriega402/Node-API-REST/blob/jwt/imgs/ER/diagramaER.PNG)
