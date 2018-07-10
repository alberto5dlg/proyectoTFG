const express = require('express');
const db = require('./bbdd');
const bodyParser = require('body-parser');
const app = express();
const utils = require('./utils/utils');
app.use(bodyParser.json());
var cors = require('cors');

// use it before all route definitions
app.use(cors({origin: '*',credentials: true}));

//Declaramos la variable de rutas del API
const stationsRouter = require('./routes/station');
const notFoundRoute = require( './routes/route404' );
const genericRoute = require('./routes/routeGeneric');
const registerStationsRouter = require('./routes/registerStations');
const apiWeather = require('./routes/apiWeather');
const homeRouter = require('./routes/apiHome');

//Declaracion de rutas genericas
app.use('/api/data', stationsRouter);
app.use('/api/register', registerStationsRouter);
app.use('/api/home', homeRouter);
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

/*utils.almacenarPruebas("sensor_pruebas", "Pruebas", 24, 60, utils.fechaDeHoy());
utils.almacenarPruebas("sensor_pruebas", "Pruebas", 28, 61, utils.fechaDeHoy());
utils.almacenarPruebas("sensor_pruebas", "Pruebas", 26, 58, utils.fechaDeHoy());
utils.almacenarPruebas("sensor_pruebas", "Pruebas", 30, 49, utils.fechaDeHoy());
utils.almacenarPruebas("sensor_pruebas", "Pruebas", 24, 58, utils.fechaDeHoy());
utils.almacenarPruebas("sensor_pruebas", "Pruebas", 31, 47, utils.fechaDeHoy());
utils.almacenarPruebas("sensor_pruebas", "Pruebas", 25, 59, utils.fechaDeHoy());
utils.almacenarPruebas("sensor_pruebas", "Pruebas", 23, 54, utils.fechaDeHoy());
utils.almacenarPruebas("sensor_pruebas", "Pruebas", 28, 63, utils.fechaDeHoy());
utils.almacenarPruebas("sensor_pruebas", "Pruebas", 32, 44, utils.fechaDeHoy());
utils.almacenarPruebas("sensor_pruebas", "Pruebas", 26, 59, utils.fechaDeHoy());
utils.almacenarPruebas("sensor_pruebas", "Pruebas", 30, 57, utils.fechaDeHoy());
utils.almacenarPruebas("sensor_pruebas", "Pruebas", 32, 57, utils.fechaDeHoy());
utils.almacenarPruebas("sensor_pruebas", "Pruebas", 35, 55, utils.fechaDeHoy());
utils.almacenarPruebas("sensor_pruebas", "Pruebas", 28, 56, utils.fechaDeHoy());
utils.almacenarPruebas("sensor_pruebas", "Pruebas", 27, 58, utils.fechaDeHoy());
utils.almacenarPruebas("sensor_pruebas", "Pruebas", 30, 60, utils.fechaDeHoy());
utils.almacenarPruebas("sensor_pruebas", "Pruebas", 22, 65, utils.fechaDeHoy());
utils.almacenarPruebas("sensor_pruebas", "Pruebas", 28, 57, utils.fechaDeHoy());
utils.almacenarPruebas("sensor_pruebas", "Pruebas", 24, 55, utils.fechaDeHoy());
utils.almacenarPruebas("sensor_pruebas", "Pruebas", 29, 48, utils.fechaDeHoy());
utils.almacenarPruebas("sensor_pruebas", "Pruebas", 25, 45, utils.fechaDeHoy());
utils.almacenarPruebas("sensor_pruebas", "Pruebas", 26, 53, utils.fechaDeHoy());
utils.almacenarPruebas("sensor_pruebas", "Pruebas", 29, 60, utils.fechaDeHoy());
*/
//exportamos el modulo
module.exports = app;