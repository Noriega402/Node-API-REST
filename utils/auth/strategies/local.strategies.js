const { Strategy } = require('passport-local');
const bcrypt = require('bcrypt');
const controller = require('../../../controllers/users.controller');
const { User } = require('../../../db/models/user.model');

const LocalStrategy = new Strategy({
    usernameField: 'email',
    passwordField: 'password',
}, async (email, password, done) => {
    try {
        const user = await User.findOne({
            where: {
                email
            }
        });
        if (!user) { // si usuario no existe
            done({ message: "Unauthorized access" }, false);
        }else{
            const match = await bcrypt.compare(password, user.password)
            if (!match) { //si password no coincide
                done({message: "Invalid credentials"}, false)
            }else{
                // console.log(user);
                done(null, user); // enviar datos
            }
        }
    } catch (err) {
        done(err, false);
    }
});

module.exports = LocalStrategy;