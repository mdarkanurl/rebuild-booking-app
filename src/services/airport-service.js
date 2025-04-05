const { AirportRepo } = require('../repo');
const AppError = require('../utils/errors/app.error');

const { StatusCodes } = require('http-status-codes');

const airportRepo = new AirportRepo();

const createAirport = async (data) => {
    try {
        const airport = await airportRepo.create(data);
        return airport;
    } catch (error) {
        if(error.name === 'SequelizeValidationError') {
            let explanation = [];
            error.errors.forEach( (err) => {
                explanation.push(err.message);
            });
            throw new AppError(explanation, StatusCodes.BAD_REQUEST);
        }
        throw new AppError('Can\'t create a new Airport object', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

const getAirports = async () => {
    try {
        const airports = await airportRepo.getAll();
        return airports;
    } catch (error) {
        throw new AppError('Can\'t fetch data of all the airports', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

const getAirport = async (id) => {
    try {
        const airport = await airportRepo.get(id);
        return airport;
    } catch (error) {
        if(error.statusCode === StatusCodes.NOT_FOUND) {
            throw new AppError('The airport you requested is not present', error.statusCode);
        }
        throw new AppError('Can\'t fetch data of the airport', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

const destroyAirport = async (id) => {
    try {
        const response = await airportRepo.destroy(id);
        return response;
    } catch (error) {
        if(error.statusCode === StatusCodes.NOT_FOUND) {
            throw new AppError('The airport you requested to delete is not present', error.statusCode);
        }
        throw new AppError('Can\'t delete the airport', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

const updateAirport = async ({ name, code }, id) => {
    try {
        const response = await airportRepo.update({ name, code }, id);
        return response;
    } catch (error) {
        if(error.statusCode === StatusCodes.NOT_FOUND) {
            throw new AppError('The airport you requested to update is not present', error.statusCode);
        }
        throw new AppError('Can\'t update the airport', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

module.exports = {
    createAirport,
    getAirport,
    getAirports,
    destroyAirport,
    updateAirport
}