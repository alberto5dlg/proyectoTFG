var express = require('express');
var apiWeather = express.Router();
var api = require('../API/apiWeather');

apiWeather.get('/:zone', api.getWeatherZone);

module.exports = apiWeather;