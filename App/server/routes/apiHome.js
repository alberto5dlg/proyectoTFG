var express = require('express');
var homeRouter = express.Router();
var api = require('../API/apiHome');

homeRouter.get('/', api.getHome);
homeRouter.post('/register', api.addHome);
homeRouter.delete('/delete', api.deleteHome);

module.exports = homeRouter;