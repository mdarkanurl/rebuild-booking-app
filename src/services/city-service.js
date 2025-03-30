const { CityRepo } = require('../repo');
const AppError = require('../utils/errors/app.error');

const { StatusCodes } = require('http-status-codes');

const cityRepo = new CityRepo();

const createCity = async (data) => {
    try {
        const city = await cityRepo.create(data);
        return city;
    } catch (error) {
        if(error.name === 'SequelizeValidationError' || error.name ==='SequelizeUniqueConstraintError') {
            let explanation = [];
            error.errors.forEach( (err) => {
                explanation.push(err.message);
            });
            throw new AppError(explanation, StatusCodes.BAD_REQUEST);
        }
        throw new AppError('Can\'t create a new City object', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

const destroyCity = async (id) => {
    try {
        const response = await cityRepo.destroy(id);
        return response;
    } catch (error) {
        if(error.statusCode === StatusCodes.NOT_FOUND) {
            throw new AppError('The city you requested to delete is not present', error.statusCode);
        }
        throw new AppError('Can\'t delete the city', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

const updateCity = async (data, id) => {
    try {
        const response = await cityRepo.update({ name: data }, id);
        return response;
    } catch (error) {
        if(error.statusCode === StatusCodes.NOT_FOUND) {
            throw new AppError('The city you requested to update is not present', error.statusCode);
        }
        throw new AppError('Can\'t update the city', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

module.exports = {
    createCity,
    destroyCity,
    updateCity
}