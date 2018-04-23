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
                console.log("nueva estacion registrada: "+ newStation.nombre.toString());
                res.status(201);
                //res.header('Location','http://'+utils.getHostname(pet)+'/api/usuarios/'+ newUsuario.login);
                res.send(newStation);
            }
        });
    }
};

//metodo para obtener los datos de la estacion registrada
exports.getStation = function (pet, res) {
        stationRegister.findOne({id: pet.params.station}, function(err, station){
            if(station == undefined){
                res.status(404);
                res.send("Estacion no existente.");
            } else  {
                var response = {
                    station
                };
                res.status(200);
                res.json(response);
            }
        });
};

//Borra una estacion registrada
exports.deleteStation = function(pet, res) {
    var nameStation = pet.params.station;
    stationRegister.findOne({id: nameStation }, function(err, data){
        if(data == undefined){
            res.status(404);
            res.send('Estacion no existente, no se puede borrar');
        } else {
            data.remove(function(error){
                if(!err) {
                    res.status(204);
                    res.send('Borrado correctamente');
                    res.end();
                }else {
                    res.status(500);
                    res.send('Error del servidor al borrar, intentelo de nuevo mas tarde');
                    res.end();
                    console.log('Error al borarr: ' + err.message);
                }
            })
        }
    })
};

//Obtiene todas las estaciones registradas
exports.getAllRegisterStations = function(pet, res) {
    var lista = stationRegister.find();

    lista.then(function (stations){
        res.status(200);
        res.send(stations);
    });
    lista.catch(function(err){
        res.status(500);
        res.end();
        console.log('Error: ' + e.message);
    })
};

//Metodo PUT para editar la estacion especificada por ID
exports.editStation = function(pet, res) {
    var editStation = new stationRegister(pet.body);
    var idToEdit = pet.params.station;

    if(editStation.nombre == undefined || editStation.ip == undefined || editStation.id == undefined){
        res.status(400);
        res.send("Faltan campos para poder editar la estacion");
    } else {
        stationRegister.findOne({id: idToEdit}, function(err, data){
            if(data == undefined){
                res.status(404);
                res.send("La estación a editar no existe");
            } else {
                data.nombre = editStation.nombre;
                data.ip = editStation.ip;
                data.id = editStation.id;
                stationRegister.update({id: idToEdit}, data, function(err){
                    if(err) {
                        console.log(err);
                        res.status(500);
                        res.end();
                    } else {
                        res.status(202);
                        res.send(data);
                        res.end();
                    }
                });
            }
        });
    }
};