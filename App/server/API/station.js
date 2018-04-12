var Station = require('../models/statitionSchema');
var stationRegister = require('../models/registerStationsSchema');
var express = require('express');
var app = express();
var utils = require('../utils/utils');
var http = require('http');

//Obtiene el historial de la estacion
exports.getHistorico = function(pet, res) {
    var stationName = pet.params.station;
    var lista = Station.find({nombre: stationName});

    lista.then(function(stationData) {
        res.status(200);
        res.send(stationData);
    });
    lista.catch(function (err){
        res.status(500);
        res.end();
        console.log('Error: ' + err.message);
    });
};

//Obtiene los datos en tiempo real de la estacion
exports.getRemoteStation = function(pet, resp){
    var nombre = pet.params.station;
    stationRegister.findOne({id:nombre}, function(err, data){

       if(data == undefined){
            resp.status(404);
            resp.send("La estacion " + nombre + " no existe");
       } else {
           var req = http.get('http://'+data.ip, function(res) {
               console.log('STATUS: ' + res.statusCode);
               console.log('HEADERS: ' + JSON.stringify(res.headers));

               var bodyChunks = [];
               res.on('data', function(chunk) {
                   bodyChunks.push(chunk);
               }).on('end', function() {
                   var body = Buffer.concat(bodyChunks);
                   console.log('BODY: ' + body);
                   resp.send(body);
                   var variables = JSON.parse(body);
                   saveDataStation(nombre, variables);
               })
           });

           req.on('error', function(e) {
               console.log('ERROR: ' + e.message);
               resp.status(404);
               resp.send();
           });
       }
    })
};

//Guarda los datos obtenidos de la estacion en la BBDD
saveDataStation = function(nombre, body) {
    var newStation = Station();
    newStation.nombre = nombre;
    newStation.fecha = utils.getFechaCompleta();
    newStation.temperatura = body.variables.temperatura;
    newStation.humedad = body.variables.humedad;
    newStation.save(function (error, sta){
        if(error)
            console.log('Error al guardar los datos: '+ error.message);
        else
            console.log('Guardados los datos con exito');
    })

};