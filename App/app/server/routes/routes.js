var express = require('express');
var router = express.Router();
var api = require('../API');

router.get('/prueba', api.prueba);

module.exports = router;