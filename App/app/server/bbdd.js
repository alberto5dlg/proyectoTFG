//import uriUtil from 'mongodb-uri';
const  mongoose = require('mongoose');
//import { dbDevelopment, dbTest } from '../../conf';


exports.DBConnect = () => {
    const dbUri = 'mongodb://localhost/projectDB';
    mongoose.connect(dbUri, function(err, res) {
        if(err) {
            console.log('ERROR: En la conexion con la Base de Datos. ' + err);
        }
        else
            console.log('Conectado a la Base de Datos...');
    });
};

exports.DBDisconnect = () => {
    mongoose.connection.close(() => {
        console.log('Desconectado de la Base de Datos');
        process.exit(0);
    });
};
