var apiHome = require('../models/apiHome');
var express = require('express');
var app = express();

//METODO POST añadir nueva estacion
exports.addHome = function(pet, res) {
    var myHome = apiHome.find();

    myHome.then(function(home){
        if(home.length != 0) {
            res.status(500);
            res.send("No se puede añadir la casa, borra la existente primero");
        }
        else {
            var home = new apiHome(pet.body);
            if (home.id == undefined || home.nPlantas == undefined) {
                res.status(400);
                res.send("Faltan campos para poder añadir la casa.");
            }
            else {
                home.save(function (err, newHome) {
                    if (err) {
                        res.status(400);
                        res.send("No se puede crear la casa, algun campo es incorrecto");
                    } else {
                        console.log("nueva casa registrada: " + newHome.id.toString());
                        res.status(201);
                        res.send(newHome);
                    }
                });
            }
        }
    });
    myHome.catch(function(err){
        res.status(500);
        res.end();
        console.log('Error: ' + e.message);
    });
};

//metodo para obtener los datos de la estacion registrada
exports.getHome = function (pet, res) {
    var myHome = apiHome.find();

    myHome.then(function (home){
        res.status(200);
        res.send(home);
    });
    myHome.catch(function(err){
        res.status(500);
        res.end();
        console.log('Error: ' + e.message);
    });
};

//Borra una estacion registrada
exports.deleteHome = function(pet, res) {
    apiHome.findOne({}, function(err, data){
        console.log(data);
        if(data == undefined){
            res.status(404);
            res.send('No hay ningun hogar registrado, no se puede borrar');
        } else {
            data.remove(function(error){
                if(!err) {
                    res.status(204);
                    res.send('Borrado correctamente ...');
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

var multer = require('multer');
var DIR = '../client/src/assets';
var upload = multer({dest: DIR}).single('file');

exports.uploadImage = function(pet, res){
    var path = '';
    upload(pet, res, function (err) {
        if (err) {
            console.log('ERROR: '+ err);
            return res.status(422).send("an Error occured")
        }
        console.log(pet.file);
        // No error occured.
        path ={
            'Status': 'Subido Correctamente',
            'path': pet.file.path,
            'name':pet.file.filename
        } ;
        res.send(path);
    });
};