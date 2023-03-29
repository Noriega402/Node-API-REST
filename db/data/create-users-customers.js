const faker = require('faker');
const bcrypt = require('bcrypt');
const names = require('./names.json');
const { User, Customer } = require('../models');
const { UserSchema } = require('../models/user.model');

// console.log(random);
// console.log(roles[random]);

const createUsers = async () => {
    const users = [];
    const roles = ['admin', 'customer', 'guest']
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

// async function generarCredenciales() {
//     for (const letra of names) {
//         const primeraLetra = letra.nombre.charAt(0)
//         const apellido = letra.nombre.split(" ");
//         const iniciales = `${primeraLetra}${apellido[2].toLocaleLowerCase()}`
//         const email = `${iniciales}@gmail.com`
//         const password = `${iniciales}123`
//         const hash = await bcrypt.hash(password,10);
//         console.log(`Email: ${email}`);
//         console.log(`Password => ${password}`);
//         console.log(`Encriptacion => ${hash}`);
//     }
//     console.log(`El total de alumnos es de: ${names.length}`);
// }
// generarCredenciales()

    // for (const nombre of names) {
    //     const [firstName, lastName] = nombre.split(' ');
    //     const email = `${firstName.toLowerCase()}.${lastName.toLowerCase()}@example.com`;
    //     const password = await bcrypt.hash(lastName, 10);
    //     const user = await User.create({
    //         username: firstName.toLowerCase(),
    //         email,
    //         password,
    //     });
    //     const customer = await Customer.create({
    //         firstName,
    //         lastName,
    //         userId: user.id,
    //     });
    //     users.push(user);
    // }
    // console.log('Users created:', users.length);

module.exports = createUsers;