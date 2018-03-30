const express = require('express');
const db = require('./bbdd');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());

//Declaramos la variable de rutas del API
const router = require('./routes/routes');

app.use('/api', router);

//Ruta generica del servidor
app.get('/', function(pet, res){
    res.send('API REST para projecto TFG')
});

//Puerto y conexion del API
app.set('port', (process.env.PORT || 5000));

app.listen(app.get('port'), function() {
    console.log('Aplicacion Node.js ejecutandose en el puerto: '+ app.get('port'));
});


//Iniciamos la conexion a la BBDD
db.DBConnect();

//exportamos el modulo
module.exports = app;