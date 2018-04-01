var stationRegister = require('../models/registerStationsSchema');
var express = require('express');
var app = express();

//METODO POST añadir nueva estacion
exports.addStation = function(pet, res) {
    var station = new stationRegister(pet.body);

    if(station.nombre == undefined || station.ip == undefined){
        res.status(400);
        res.send("Faltan campos para poder añadir la estacion.");
    }
    else {
        station.save(function(err, newStation) {
            if(err){
                res.status(400);
                res.send("No se puede crear el usuario, algun campo es incorrecto");
            } else {
                console.log("nueva estacion registrada: "+ newStation.toString());
                res.status(201);
                //res.header('Location','http://'+utils.getHostname(pet)+'/api/usuarios/'+ newUsuario.login);
                res.send(newStation);
            }
        });
    }
}

exports.getStation = function (pet, res) {
        stationRegister.findOne({nombre: pet.params.station}, function(err, station){
            if(station == undefined){
                res.status(404);
                res.send("Estacion no existente.");
            } else  {
                var response = {
                    station
                }
                res.status(200);
                res.json(response);
            }
        });
};