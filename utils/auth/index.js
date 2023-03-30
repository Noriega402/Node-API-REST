const passport = require('passport');
const LocalStrategy = require('./strategies/local.strategies');
const jwtStrategy = require('./strategies/jwt.stategies');

passport.use(LocalStrategy);
passport.use(jwtStrategy);