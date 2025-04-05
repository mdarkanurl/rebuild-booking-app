const express = require('express');
const router = express.Router();
const { infoControllers } = require('../../controllers/index');
const ariplaneRoutes = require('./airplane-routes');
const cityRoutes = require('./city-routes');
const airportRoutes = require('./airport-routes');
const flightRoutes = require('./flight-routes');

router.use('/airplanes', ariplaneRoutes);
router.use('/cities', cityRoutes);
router.use('/airports', airportRoutes);
router.use('/flights', flightRoutes);
router.get('/info', infoControllers.info);

module.exports = router;