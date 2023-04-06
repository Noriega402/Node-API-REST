const faker = require('faker');
const bcrypt = require('bcrypt');
const names = require('./names.json');
const { User, Customer } = require('../models');
const { UserSchema } = require('../models/user.model');

const createUsers = async () => {
    const users = [];
    const roles = ['admin', 'seller', 'customer']
    for (const letra of names) {
        const primeraLetra = letra.nombre.charAt(0)
        const nombres = letra.nombre.split(" ");
        const username = `${primeraLetra}${nombres[2].toLocaleLowerCase()}`
        const email = `${username}@gmail.com`
        const password = `${username}123`
        const hash = await bcrypt.hash(password,10);
        const numeroTelefono = faker.phone.phoneNumber();//generar numero
        const random = Math.floor(Math.random() * 3)
        const phone = numeroTelefono.toString();//pasarlo a string
        const created_at = faker.date.between('2019-01-01', new Date());
        const user = {
            username,
            email,
            password: hash,
            role: roles[random],
            created_at
        };
        const customer = {
            first_name: nombres[0],
            last_name: nombres[2],
            phone,
            user_id: letra.id,
            created_at
        };
        users.push({user, customer});
    }
    // console.log(users);
    return users;
};
// createUsers();

module.exports = createUsers;