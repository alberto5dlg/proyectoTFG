var express = require('express');
var stationRouter = express.Router();
var api = require('../API/registerStations');

stationRouter.post('/', api.addStation);
stationRouter.get('/:station', api.getStation);
stationRouter.delete('/:station', api.deleteStation);
stationRouter.put('/:station', api.editStation);
stationRouter.get('/', api.getAllRegisterStations);

module.exports = stationRouter;