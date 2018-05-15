var Station = require('../models/statitionSchema');
var stationRegister = require('../models/registerStationsSchema');
var express = require('express');
var app = express();
var utils = require('../utils/utils');
var http = require('http');

//Obtiene el historial de la estacion
exports.getHistorico = function(pet, res) {
    var stationId = pet.params.station;
    var lista = Station.find({idStation: stationId});

    lista.then(function(stationData) {
        if(lista.length == 0){
            resp.status(404);
            resp.send("No existen datos para la estación solicitada ...")
        }else {
            res.status(200);
            res.send(stationData);
        }
    });
    lista.catch(function (err){
        res.status(500);
        res.end();
        console.log('Error: ' + err.message);
    });
};

//Obtiene los datos en tiempo real de la estacion
exports.getRemoteStation = function(pet, resp){
    var idStation = pet.params.station;
    stationRegister.findOne({id:idStation}, function(err, data){

       if(data == undefined){
            resp.status(404);
            resp.send("La estacion " + idStation + " no existe");
       } else {
           var req = http.get('http://'+data.ip, function(res) {
               var bodyChunks = [];
               res.on('data', function(chunk) {
                   bodyChunks.push(chunk);
               }).on('end', function() {
                   var body = Buffer.concat(bodyChunks);
                   resp.send(body);
                   var variables = JSON.parse(body);
                   saveDataStation(variables);
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

exports.getHistoricoFecha = function(pet, resp) {
    var searchDate = pet.params.dateSearch
    var idStation = pet.params.station;
    var lista = Station.find({dia: searchDate, idStation: idStation});

    lista.then(function(stationData) {
        if(stationData.length == 0)
        {
            resp.status(404);
            resp.send("No se han encontrado datos para la fecha seleccionada ...");
        }else {
            resp.status(200);
            resp.send(stationData);
        }
    });
    lista.catch(function (err){
        resp.status(500);
        resp.end();
        console.log('Error: ' + err.message);
    });

};

//Guarda los datos obtenidos de la estacion en la BBDD
saveDataStation = function(body) {
    var newStation = Station();
    newStation.idStation = body.name;
    newStation.nombre = body.variables.nombre;
    newStation.fecha = utils.getFechaCompleta();
    newStation.dia = utils.fechaDeHoy();
    newStation.hora = utils.getHora();
    newStation.temperatura = body.variables.temperatura;
    newStation.humedad = body.variables.humedad;
    newStation.save(function (error, sta){
        if(error)
            console.log('Error al guardar los datos: '+ error.message);
        else
            console.log('Guardados los datos con exito de: ' + body.name);
    })
};