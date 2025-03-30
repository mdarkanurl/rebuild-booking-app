const { AirplaneRepo } = require('../repo');
const AppError = require('../utils/errors/app.error');

const { StatusCodes } = require('http-status-codes');

const airplaneRepo = new AirplaneRepo();

const createAirplane = async (data) => {
    try {
        const airplane = await airplaneRepo.create(data);
        return airplane;
    } catch (error) {
        if(error.name === 'SequelizeValidationError') {
            let explanation = [];
            error.errors.forEach( (err) => {
                explanation.push(err.message);
            });
            throw new AppError(explanation, StatusCodes.BAD_REQUEST);
        }
        throw new AppError('Can\'t create a new Airplane object', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

const getAirplanes = async () => {
    try {
        const airplanes = await airplaneRepo.getAll();
        return airplanes;
    } catch (error) {
        throw new AppError('Can\'t fetch data of all the airplanes', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

const getAirplane = async (id) => {
    try {
        const airplane = await airplaneRepo.get(id);
        return airplane;
    } catch (error) {
        if(error.statusCode === StatusCodes.NOT_FOUND) {
            throw new AppError('The airplane you requested is not present', error.statusCode);
        }
        throw new AppError('Can\'t fetch data of the airplane', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

const destroyAirplane = async (id) => {
    try {
        const response = await airplaneRepo.destroy(id);
        return response;
    } catch (error) {
        if(error.statusCode === StatusCodes.NOT_FOUND) {
            throw new AppError('The airplane you requested to delete is not present', error.statusCode);
        }
        throw new AppError('Can\'t delete the airplane', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

const updateAirplane = async (data, id) => {
    try {
        const response = await airplaneRepo.update({ capacity: data }, id);
        return response;
    } catch (error) {
        if(error.statusCode === StatusCodes.NOT_FOUND) {
            throw new AppError('The airplane you requested to update is not present', error.statusCode);
        }
        throw new AppError('Can\'t update the airplane', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

module.exports = {
    createAirplane,
    getAirplanes,
    getAirplane,
    destroyAirplane,
    updateAirplane
}