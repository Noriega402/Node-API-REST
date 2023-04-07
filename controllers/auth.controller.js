const { models } = require('../libs/sequelize');
const path = require('path');
const bcrypt = require('bcrypt');
const { User } = require('../db/models/user.model');
const { signToken, signTokenRecovery } = require('../utils/jwt/token.sign');
const verifyToken = require('../utils/jwt/token-verify');
const nodemailer = require('nodemailer');
const { config } = require('../config/config');
const { updateRecovery } = require('./users.controller');
const controller = {};

//validar si existe el email en la DB
controller.getUser = async (request, response, next) => {
    try {
        const body = request.body;
        if (body.message) {
            return response.json(body);
        } else {

            const find = await models.User.findOne({
                where: {
                    email: body.email
                }
            });

            if (!find) {
                return response.json({ message: "User not found" });
            } else {
                const token = signToken(find, config.jwtSecret); //validar token
                delete find.dataValues.password;
                return response.json({
                    find,
                    token
                });
            }

        }
    } catch (error) {
        next(error);
    }
}

controller.sendMail = async (mail) => { //espera informacion para enviar el mail
    try {
        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            secure: true,
            port: 465,
            auth: {
                user: config.mail,
                pass: config.mailPassword
            }
        });

        await transporter.sendMail(mail);
    } catch (error) {
        throw error;
    }
}

controller.sendRecovery = async (request, response, next) => {
    try {
        const body = request.body;
        const user = await models.User.findOne({
            where: {
                email: body.email
            }
        });

        if (!user) { //usuario no encontrado
            return response.json({
                statusCode: 404,
                error: "Unauthorized",
                message: "Unauthorized access"
            });
        }

        const payload = user.id;
        const token = signTokenRecovery(payload, config.recoveryPassword);
        const link = `http://api-node-denc.com/recovery?token=${token}`;

        await updateRecovery(user.id, {recoveryToken: token}); //actualiza recovery_token de la DB

        const mail = {
            from: `"Recuperación de contraseña" <${config.mail}>`, // quien envia
            to: `${user.email}`, // Enviar a:
            subject: "Daniel Noriega", // Titulo de mail
            html: `<h2>Hola ${user.dataValues.username}</h2>
                    <b>Ingresa a este <a href="${link}">link</a></b>
                    <br>
                    <p>En caso no funcione tu link puedes dar click al siguiente enlace: <a>${link}</a></p>`, // html body
        }

        await controller.sendMail(mail); //enviar la informacion del mail
        return response.json({ message: "mail sent" });
    } catch (error) {
        next(error);
    }

}

controller.resetPassword = async (request, response, next) => {
    try {
        const { token, newPassword } = request.body;
        const payload = verifyToken(token, config.recoveryPassword);
        const user = await models.User.findByPk(payload.sub);

        if(!user){
            return response.status(404).json({
                statusCode: 404,
                error: "Not found",
                message: "User not found"
            });
        }

        if(user.recoveryToken !== token){ // si el token no coincide
            return response.status(401).json({
                statusCode: 401,
                error: "Unauthorized",
                message: "Unauthorized access"
            });
        }

        const passHash = await bcrypt.hash(newPassword, 10);
        //eliminar el recovery_token de la DB
        await updateRecovery(user.id, {recoveryToken: null, password: passHash});
        return response.json({message: "Password reset!"});

    } catch (error) {
        next(error)
    }
}

module.exports = controller;