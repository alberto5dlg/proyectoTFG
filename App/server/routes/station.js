var express = require('express');
var stationRouter = express.Router();
var api = require('../API/station');

stationRouter.get('/historial/:station', api.getHistorico);
stationRouter.get('/:station', api.getRemoteStation);
stationRouter.get('/:station/:dateSearch', api.getHistoricoFecha);

module.exports = stationRouter;