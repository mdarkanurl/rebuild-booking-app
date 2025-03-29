const express = require('express');
const router = express.Router();

const { AriplaneController } = require('../../controllers/index');

router.post('/', AriplaneController.createAirplane);

module.exports = router