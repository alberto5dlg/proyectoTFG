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

/*utils.almacenarPruebas("sensor_pruebas", "Pruebas", 46, 73, utils.fechaDeHoy());
utils.almacenarPruebas("sensor_pruebas", "Pruebas", 48, 71, utils.fechaDeHoy());
utils.almacenarPruebas("sensor_pruebas", "Pruebas", 46, 78, utils.fechaDeHoy());
utils.almacenarPruebas("sensor_pruebas", "Pruebas", 40, 79, utils.fechaDeHoy());
utils.almacenarPruebas("sensor_pruebas", "Pruebas", 49, 70, utils.fechaDeHoy());
utils.almacenarPruebas("sensor_pruebas", "Pruebas", 48, 76, utils.fechaDeHoy());
utils.almacenarPruebas("sensor_pruebas", "Pruebas", 47, 78, utils.fechaDeHoy());
utils.almacenarPruebas("sensor_pruebas", "Pruebas", 44, 70, utils.fechaDeHoy());
utils.almacenarPruebas("sensor_pruebas", "Pruebas", 44, 78, utils.fechaDeHoy());
utils.almacenarPruebas("sensor_pruebas", "Pruebas", 41, 77, utils.fechaDeHoy());
utils.almacenarPruebas("sensor_pruebas", "Pruebas", 45, 79, utils.fechaDeHoy());
utils.almacenarPruebas("sensor_pruebas", "Pruebas", 43, 74, utils.fechaDeHoy());
utils.almacenarPruebas("sensor_pruebas", "Pruebas", 40, 70, utils.fechaDeHoy());
utils.almacenarPruebas("sensor_pruebas", "Pruebas", 42, 75, utils.fechaDeHoy());
utils.almacenarPruebas("sensor_pruebas", "Pruebas", 48, 77, utils.fechaDeHoy());
utils.almacenarPruebas("sensor_pruebas", "Pruebas", 48, 73, utils.fechaDeHoy());
utils.almacenarPruebas("sensor_pruebas", "Pruebas", 42, 74, utils.fechaDeHoy());
utils.almacenarPruebas("sensor_pruebas", "Pruebas", 46, 79, utils.fechaDeHoy());
utils.almacenarPruebas("sensor_pruebas", "Pruebas", 40, 77, utils.fechaDeHoy());
utils.almacenarPruebas("sensor_pruebas", "Pruebas", 42, 77, utils.fechaDeHoy());
utils.almacenarPruebas("sensor_pruebas", "Pruebas", 45, 75, utils.fechaDeHoy());
utils.almacenarPruebas("sensor_pruebas", "Pruebas", 44, 75, utils.fechaDeHoy());
utils.almacenarPruebas("sensor_pruebas", "Pruebas", 49, 78, utils.fechaDeHoy());
utils.almacenarPruebas("sensor_pruebas", "Pruebas", 45, 75, utils.fechaDeHoy());
*/

//exportamos el modulo
module.exports = app;