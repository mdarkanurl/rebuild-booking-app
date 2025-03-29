const express = require('express');
const router = express.Router();
const { infoControllers } = require('../../controllers/index');
const ariplaneRoutes = require('./airplane-routes');

router.use('/airplanes', ariplaneRoutes);
router.get('/info', infoControllers.info);

module.exports = router;