const express = require('express');
const db = require('./bbdd');
const bodyParser = require('body-parser');
const app = express();
const utils = require('./utils/utils');
app.use(bodyParser.json());
var cors = require('cors');

// use it before all route definitions
app.use(cors({origin: '*'}));

//Declaramos la variable de rutas del API
const stationsRouter = require('./routes/station');
const notFoundRoute = require( './routes/route404' );
const genericRoute = require('./routes/routeGeneric');
const registerStationsRouter = require('./routes/registerStations');
const apiWeather = require('./routes/apiWeather');

//Declaracion de rutas genericas
app.use('/api/data', stationsRouter);
app.use('/api/register', registerStationsRouter);
app.use('/api/weather', apiWeather);
app.use('/',genericRoute);
app.use(notFoundRoute);

//Puerto y conexion del API
app.set('port', (process.env.PORT || 5000));
app.listen(app.get('port'), function() {
    console.log(utils.fechaDeHoy() + " - " + utils.getHora() + ' -- Aplicacion Node.js ejecutandose en el puerto: '+ app.get('port'));
});

//Iniciamos la conexion a la BBDD
db.DBConnect();

//Lectura de datos automaticamente cada cierto tiempo
var CronJob = require('cron').CronJob;

new CronJob('15 10 * * * *', function() {
    utils.getDataAllStations();
}, null, true);

//exportamos el modulo
module.exports = app;