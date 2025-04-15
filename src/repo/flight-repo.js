const { Sequelize } = require('sequelize');

const CrudRepo = require('./crud-repo');
const { Flight, Airplane, Airport, City } = require('../models');

class FlightRepo extends CrudRepo {
    constructor() {
        super(Flight);
    }

    async getAllFlights(filter, sort) {
        const response = await Flight.findAll({
            where: filter,
            order: sort,
            include: [
                {
                    model: Airplane,
                    required: true,
                    as: 'airplaneDetail'
                },
                {
                    model: Airport,
                    required: true,
                    as: 'depertureAirport',
                    on: {
                        coli: Sequelize.where(Sequelize.col("Flight.depertureAirportId"), "=", Sequelize.col("depertureAirport.code"))
                    },
                    include: {
                        model: City,
                        required: true
                    }
                },
                {
                    model: Airport,
                    required: true,
                    as: 'arrivalAirport',
                    on: {
                        coli: Sequelize.where(Sequelize.col("Flight.arrivalAirportId"), "=", Sequelize.col("arrivalAirport.code"))
                    },
                    include: {
                        model: City,
                        required: true
                    }
                }
            ]
        });

        return response;
    }
}

module.exports = FlightRepo