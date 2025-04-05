const { FlightRepo } = require('../repo');
const AppError = require('../utils/errors/app.error');

const { StatusCodes } = require('http-status-codes');
const { Op } = require('sequelize');

const flightRepo = new FlightRepo();

const createFlight = async (data) => {
    try {
        const flight = await flightRepo.create(data);
        return flight;
    } catch (error) {
        if(error.name === 'SequelizeValidationError') {
            let explanation = [];
            error.errors.forEach( (err) => {
                explanation.push(err.message);
            });
            throw new AppError(explanation, StatusCodes.BAD_REQUEST);
        }
        throw new AppError('Can\'t create a new Flight object', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

const getAllFlights = async (query) => {
    let customFilter = {};
    let sortFilter = [];
    const endingTripTime = ' 23:59:00';
    // Trips=BRI-ABT
    if(query.trips) {
        [depertureAirportId, arrivalAirportId] = query.trips.split('-');

        customFilter.depertureAirportId = depertureAirportId;
        customFilter.arrivalAirportId = arrivalAirportId;

        if(customFilter.depertureAirportId === customFilter.arrivalAirportId) {
            throw new AppError('depertureAirportId and arrivalAirportId must be different', StatusCodes.BAD_REQUEST);
        }
    }

    if(query.price) {
        [minPrice, maxPrice] = query.price.split('-');

        if(minPrice > maxPrice) {
            throw new AppError('minPrice has to be less than maxPrice', StatusCodes.BAD_REQUEST);
        }

        customFilter.price = {
            [Op.between]: [minPrice, ((maxPrice === undefined) ? 100000: maxPrice)]
        }
    }

    if(query.travellers) {
        customFilter.totalSeats = {
            [Op.gte]: query.travellers
        }
    }

    if(query.tripDate) {
        customFilter.departureTime = {
            [Op.between]: [query.tripDate, query.tripDate+endingTripTime]
        }
    }

    if(query.sort) {
        const params = query.sort.split(',');
        const sortFilters = params.map((params) => params.split('_'));

        sortFilter = [sortFilters]
    }

    try {
        const fligths = await flightRepo.getAllFlights(customFilter, sortFilter);
        return fligths;
    } catch (error) {
        throw new AppError('Can\'t fetch data of all the flights', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

module.exports = {
    createFlight,
    getAllFlights
}