const { ValidationError } = require('sequelize');

function logErrors(err, req, res, next) {
    console.error(err);
    next(err);
}

function errorHandler(err, re, res, next) {
    res.status(500).json({
        message: err.message,
        stack: err.stack,
    });
}

function ormErrorHandler(err, req, res, next) {
    if (err instanceof ValidationError) {
        res.status(409).json({
            statusCode: 409,
            message: err,
        });
    }
    next(err);
}

module.exports = { logErrors, errorHandler, ormErrorHandler };