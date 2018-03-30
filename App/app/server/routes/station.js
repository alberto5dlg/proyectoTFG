var express = require('express');
var stationRouter = express.Router();
var api = require('../API/station');

stationRouter.get('/prueba', api.prueba);

module.exports = stationRouter;