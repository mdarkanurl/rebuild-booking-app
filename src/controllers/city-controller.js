const { CityService } = require('../services');
const { SuccessResponse, ErrorResponse } = require('../utils/common');

const { StatusCodes } = require('http-status-codes');

const createCity = async (req, res) => {
    try {
        const city = await CityService.createCity({
            name: req.body.name
        });

        SuccessResponse.data = city;
        SuccessResponse.message = 'Successfully create an city';

        return res
                .status(StatusCodes.CREATED)
                .json(SuccessResponse);
    } catch (error) {
        ErrorResponse.message = 'Something went wrong while creating city';
        ErrorResponse.error = error;
        
        return res
                .status(error.statusCode)
                .json(ErrorResponse);
    }
}

const destroyCity = async (req, res) => {
    try {
        const city = await CityService.destroyCity(req.params.id);
        SuccessResponse.data = city;

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

const updateCity = async (req, res) => {
    try {
        const city = await CityService.updateCity(req.body.name, req.params.id);
        SuccessResponse.data = city;

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
    createCity,
    destroyCity,
    updateCity
}