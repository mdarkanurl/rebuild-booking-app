const { AirplaneService } = require('../services');
const { SuccessResponse, ErrorResponse } = require('../utils/common');

const { StatusCodes, REQUEST_URI_TOO_LONG } = require('http-status-codes');

const createAirplane = async (req, res) => {
    try {
        const airplane = await AirplaneService.createAirplane({
            modelNumber: req.body.modelNumber,
            capacity: req.body.capacity
        });

        SuccessResponse.data = airplane;
        SuccessResponse.message = 'Successfully create an airplane';

        return res
                .status(StatusCodes.CREATED)
                .json(SuccessResponse);
    } catch (error) {
        ErrorResponse.message = 'Something went wrong while creating airplane';
        ErrorResponse.error = error;
        
        return res
                .status(error.statusCode)
                .json(ErrorResponse);
    }
}

const getAirplanes = async (req, res) => {
    try {
        const airplanes = await AirplaneService.getAirplanes();
        SuccessResponse.data = airplanes;

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

const getAirplane = async (req, res) => {
    try {
        const airplanes = await AirplaneService.getAirplane(req.params.id);
        SuccessResponse.data = airplanes;

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

const destroyAirplane = async (req, res) => {
    try {
        const airplane = await AirplaneService.destroyAirplane(req.params.id);
        SuccessResponse.data = airplane;

        return res
                .status(StatusCodes.OK)
                .json(SuccessResponse)
    } catch (error) {
        ErrorResponse.error = error;
        
        return res
                .status(error.statusCode)
                .json(ErrorResponse);
    }
}

const updateAirplane = async (req, res) => {
    try {
        const airplane = await AirplaneService.updateAirplane(req.body.capacity, req.params.id);
        SuccessResponse.data = airplane;

        return res
                .status(StatusCodes.OK)
                .json(SuccessResponse)
    } catch (error) {
        ErrorResponse.error = error;
        
        return res
                .status(error.statusCode)
                .json(ErrorResponse);
    }
}

module.exports = {
    createAirplane,
    getAirplanes,
    getAirplane,
    destroyAirplane,
    updateAirplane
}