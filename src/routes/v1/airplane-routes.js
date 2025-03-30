const express = require('express');
const router = express.Router();

const { AriplaneController } = require('../../controllers/index');
const { AirplaneMiddlewares } = require('../../middlewares');

router.post('/',
       AirplaneMiddlewares.validateCreateRequest,
       AriplaneController.createAirplane);

router.get('/',
       AriplaneController.getAirplanes);

router.get('/:id',
       AriplaneController.getAirplane);

router.delete('/:id',
       AriplaneController.destroyAirplane);

router.put('/:id',
       AriplaneController.updateAirplane);

module.exports = router