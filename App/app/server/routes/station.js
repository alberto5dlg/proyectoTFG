var express = require('express');
var stationRouter = express.Router();
var api = require('../API/station');

stationRouter.get('/historico/:station', api.getHistorico);
stationRouter.get('/:station', api.getRemoteStation);
module.exports = stationRouter;