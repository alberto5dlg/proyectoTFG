var express = require('express');
var stationRouter = express.Router();
var api = require('../API/registerStations');

stationRouter.post('/', api.addStation);
stationRouter.get('/:station', api.getStation);

module.exports = stationRouter;