const { FlightService } = require('../services');
const { SuccessResponse, ErrorResponse } = require('../utils/common');

const { StatusCodes } = require('http-status-codes');

const createFlight = async (req, res) => {
    try {
        const flight = await FlightService.createFlight({
            flightNumber: req.body.flightNumber,
            airplaneId: req.body.airplaneId,
            depertureAirportId: req.body.depertureAirportId,
            totalSeats: req.body.totalSeats,
            boardingGate: req.body.boardingGate,
            price: req.body.price,
            arrivalTime: req.body.arrivalTime,
            departureTime: req.body.departureTime,
            arrivalAirportId: req.body.arrivalAirportId
        });

        SuccessResponse.data = flight;
        SuccessResponse.message = 'Successfully create an flight';

        return res
                .status(StatusCodes.CREATED)
                .json(SuccessResponse);
    } catch (error) {
        ErrorResponse.message = 'Something went wrong while creating flight';
        ErrorResponse.error = error;
        
        return res
                .status(error.statusCode)
                .json(ErrorResponse);
    }
}

const getAllFlights = async (req, res) => {
    try {
        const flights = await FlightService.getAllFlights(req.query);

        SuccessResponse.data = flights;
        SuccessResponse.message = 'Successfully get all flights';

        return res
                .status(StatusCodes.OK)
                .json(SuccessResponse)
    } catch (error) {
        ErrorResponse.message = 'Something went wrong while getting flights';
        ErrorResponse.error = error;
        
        return res
                .status(error.statusCode)
                .json(ErrorResponse);
    }
}

const getFlight = async (req, res) => {
    try {
        const flight = await FlightService.getFlight(req.params.id);
        SuccessResponse.data = flight;

        return res
                .status(StatusCodes.OK)
                .json(SuccessResponse);
    } catch (error) {
        ErrorResponse.error = error;
        
        return res
                .status(error.statusCode)
                .json(ErrorResponse);
    }
}

const updateSeats = async (req, res) => {
    try {
        const response = await FlightService.updateSeats({
            flightId: req.params.id,
            seats: req.body.seats,
            dec: req.body.dec,
        });

        SuccessResponse.data = response;

        return res
                .status(StatusCodes.OK)
                .json(SuccessResponse);
    } catch (error) {
        ErrorResponse.error = error;
        
        return res
                .status(error.statusCode)
                .json(ErrorResponse);
    }
}

module.exports = {
    createFlight,
    getAllFlights,
    getFlight,
    updateSeats
}