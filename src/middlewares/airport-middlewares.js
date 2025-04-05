const { StatusCodes } = require('http-status-codes');

const { ErrorResponse } = require('../utils/common');
const AppError = require('../utils/errors/app.error');

const validateCreateRequest = (req, res, next) => {
    if(!req.body.name || !req.body.code || !req.body.cityId) {
        ErrorResponse.message = 'Something went wrong while creating airport';
        ErrorResponse.error = new AppError( 'All field must be filled in the oncoming request in the correct form', StatusCodes.BAD_REQUEST );
        return res
                .status(StatusCodes.BAD_REQUEST)
                .json(ErrorResponse);
    }

    next();
}

module.exports = {
    validateCreateRequest
}