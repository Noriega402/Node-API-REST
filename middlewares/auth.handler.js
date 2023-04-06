const { response } = require('express');
const { config } = require('./../config/config');

function checkApiKey(req, res, next) {
    const apiKey = req.headers['api'];
    if (apiKey === config.apiKey) {
        next();
    } else {
        next(boom.unauthorized());
    }
}

function checkAdminRole(req, res, next) {
    const user = req.user;
    if (user.role === 'admin') {
        next();
    } else {
        res.status(403).json({
            statusCode: 403,
            error: "Forbidden",
            message: "Access denied"
        });
    }
}

function checkRoles(...roles) { //que roles tiene permiso a un endpoint
    return (req, res, next) => {
        const user = req.user;
        if (roles.includes(user.role)) {
            next();
        } else {
            res.status(403).json({
                statusCode: 403,
                error: "Forbidden",
                message: "Access denied"
            });
        }
    }
}



module.exports = { checkApiKey, checkAdminRole, checkRoles }