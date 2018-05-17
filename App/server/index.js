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

/*utils.almacenarPruebas(23, 50, '2018-05-12');
utils.almacenarPruebas(22, 55, '2018-05-12');
utils.almacenarPruebas(24, 45, '2018-05-12');
utils.almacenarPruebas(21, 40, '2018-05-12');
utils.almacenarPruebas(20, 43, '2018-05-12');
utils.almacenarPruebas(25, 42, '2018-05-12');
utils.almacenarPruebas(22, 54, '2018-05-12');
utils.almacenarPruebas(30, 60, '2018-05-15');
utils.almacenarPruebas(33, 62, '2018-05-15');
utils.almacenarPruebas(31, 60, '2018-05-15');
utils.almacenarPruebas(29, 59, '2018-05-15');
utils.almacenarPruebas(28, 56, '2018-05-15');*/

//Lectura de datos automaticamente cada cierto tiempo
var CronJob = require('cron').CronJob;

new CronJob('15 10 * * * *', function() {
    utils.getDataAllStations();
}, null, true);

//exportamos el modulo
module.exports = app;