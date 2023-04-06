const { ValidationError } = require('sequelize');

function logErrors(err, req, res, next) {
    console.error(err);
    next(err);
}

function errorHandler(err, re, res, next) {
    if (err instanceof require('http').ServerResponse) {
        return res.send(err.statusCode, err.statusMessage);
    } else {
        res.status(500).json({
            message: err.message,
            stack: err.stack,
        });
    }
}

function ormErrorHandler(err, req, res, next) {
    if (err instanceof ValidationError) {
        res.status(409).json({
            statusCode: 409,
            message: err,
            // type: err.parent.name,
            // description: err.parent.detail,
            // submit: err.parent.parameters,
        });
    }
    next(err);
}

module.exports = { logErrors, errorHandler, ormErrorHandler };