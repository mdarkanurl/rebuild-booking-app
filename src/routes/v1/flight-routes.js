const express = require('express');
const router = express.Router();

const { FlightMiddlewares } = require('../../middlewares');
const { FlightController } = require('../../controllers/index');

router.post('/',
       FlightMiddlewares.validateCreateRequest,
       FlightController.createFlight);

router.get('/',
       FlightController.getAllFlights);

router.get('/:id',
       FlightController.getFlight);

router.patch('/:id/seats',
       FlightMiddlewares.validateUpdateSeatsReq,
       FlightController.updateSeats);
       

module.exports = router