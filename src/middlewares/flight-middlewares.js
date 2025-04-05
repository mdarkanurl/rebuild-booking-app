const { StatusCodes } = require('http-status-codes');

const { ErrorResponse } = require('../utils/common');
const AppError = require('../utils/errors/app.error');

const validateCreateRequest = (req, res, next) => {
    if(!req.body.flightNumber || !req.body.airplaneId || !req.body.depertureAirportId || !req.body.arrivalAirportId || !req.body.arrivalTime || !req.body.departureTime || !req.body.price || !req.body.totalSeats) {
        ErrorResponse.message = 'Something went wrong while creating flight';
        ErrorResponse.error = new AppError( 'All field must be filled in the oncoming request in the correct form', StatusCodes.BAD_REQUEST );
        return res
                .status(StatusCodes.BAD_REQUEST)
                .json(ErrorResponse);
    }

    if(req.body.departureTime >= req.body.arrivalTime) {
        ErrorResponse.message = 'Something went wrong while creating flight';
        ErrorResponse.error = new AppError( 'DepartureTime must be less than ArrivalTime', StatusCodes.BAD_REQUEST );
        return res
                .status(StatusCodes.BAD_REQUEST)
                .json(ErrorResponse);
    }

    if(req.body.depertureAirportId === req.body.arrivalAirportId) {
        ErrorResponse.message = 'Something went wrong while creating flight';
        ErrorResponse.error = new AppError( 'depertureAirportId and arrivalAirportId must be different', StatusCodes.BAD_REQUEST );
        return res
                .status(StatusCodes.BAD_REQUEST)
                .json(ErrorResponse);
    }

    next();
}

module.exports = {
    validateCreateRequest
}