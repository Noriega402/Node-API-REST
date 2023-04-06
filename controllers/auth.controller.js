const { models } = require('../libs/sequelize');
const path = require('path');
const bcrypt = require('bcrypt');
const { User } = require('../db/models/user.model');
const signToken = require('../utils/jwt/token.sign');
const nodemailer = require('nodemailer');
const { config } = require('../config/config');
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

controller.sendMail = async(request, response, next) =>{
    try {
        const body = request.body;
        // console.log(body);
        const find = await models.User.findOne({
            where: {
                email: body.email
            }
        });
        // console.log(find);
        if(!find){
            return response.json({
                statusCode: 404,
                error: "Unauthorized",
                message: "Unauthorized access"
            });
        }

        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            secure: true,
            port: 465,
            auth: {
                user: config.mail,
                pass: config.mailPassword
            }
        });

        await transporter.sendMail({
            from: `"Daniel Noriega" <${body.email}>`, // quien envia
            to: `${body.email}`, // Enviar a:
            subject: "Recuperacion de contraseña con NodeJS", // Titulo de mail
            text: `${find.dataValues.username}`, // plain text body
            html: `<h2>Hola ${find.dataValues.username}</h2><p>Este correo es para recuperar tu contraseña de la app</p>`, // html body
        });

        return response.json({ message: "mail sent"});

    } catch (error) {
        next(error);
    }
}

module.exports = controller;