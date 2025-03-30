const express = require('express');
const router = express.Router();
const { infoControllers } = require('../../controllers/index');
const ariplaneRoutes = require('./airplane-routes');
const cityRoutes = require('./city-routes');

router.use('/airplanes', ariplaneRoutes);
router.use('/cities', cityRoutes);
router.get('/info', infoControllers.info);

module.exports = router;