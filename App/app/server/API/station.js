var Station = require('../models/statitionSchema');
var stationRegister = require('../models/registerStationsSchema');
var express = require('express');
var app = express();
var utils = require('../utils/utils');
var http = require('http');


exports.getHistorico = function(pet, res) {
    var lista = Station.find({nombre: pet.params.station});

    lista.then(function(station) {
        var response = {
            data: station
        };
        res.status(200);
        res.send(response);
    });
    lista.catch(function (err){
        res.status(500);
        res.end();
    });
};



exports.addDataStation = function(pet, res) {
    var station = new Station(pet.body);

    if(station.nombre == undefined || station.temperatura == undefined || station.humedad == undefined){
        res.status(400);
        res.send("Faltan campos para poder añadir una entrada de este sensor ... ");
    } else {
        station.fecha = utils.fechaDeHoy();
        station.hora = utils.getHora();
        station.save(function(err, newStation) {
            if(err){
                res.status(400);
                res.send("No se puede añadir la entrada del sensor ... ");
            } else {
                res.status(201);
                res.send(newStation);
            }
        });
    }
};

exports.getRemoteStation = function(pet, resp){
    var nombre = pet.params.station;
    stationRegister.findOne({nombre:nombre}, function(err, data){

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

}
