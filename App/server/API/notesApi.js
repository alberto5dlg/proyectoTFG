var Notes = require('../models/notesSchema');
var express = require('express');
var app = express();
var utils = require('../utils/utils');
var http = require('http');

//METODO POST añadir nueva nota para estacion
exports.addNoteStation = function(pet, res) {
    var newNote = new Notes(pet.body);

    if(newNote.idStation == undefined || newNote.note == undefined ||
        newNote.dia == undefined || newNote.horaInicio == undefined || newNote.horaFinal == undefined) {
        res.status(400);
        res.send("Faltan campos para poder crear la nota");
    }
    else {
        newNote.save(function(err, newData){
            if(err){
                res.status(400);
                res.send("No se ha podido añadir la nota");
                console.log(utils.getFechaCompleta() + " --- ERROR: " + err.message);
            } else {
                console.log(utils.getFechaCompleta() + " --- Añadida nueva nota para estacion " + newNote.idStation);
                res.status(201);
                res.send(newData);
            }
        })
    }
};

exports.getNotesByFechaStation = function(pet, res) {
    var dateSearch = pet.params.date;
    var idStation = pet.params.station;
    var lista = Notes.find({dia: dateSearch, idStation: idStation});

    lista.then(function(data) {
        if(data.length == 0){
            res.status(404);
            res.send("No se han encontrado datos para los filtros seleccionados");
        } else {
            res.status(200);
            res.send(data);
        }
    });
    lista.catch(function (err){
        resp.status(500);
        resp.end();
        console.log(utils.getFechaCompleta() + " --- ERROR: " + err.message);
    });
};

exports.getNotesByStation = function(pet, res) {
    var idStation = pet.params.station;
    var lista = Notes.find({idStation: idStation});

    lista.then(function(data) {
        if(data.length == 0){
            res.status(404);
            res.send("No se han encontrado datos para los filtros seleccionados");
        } else {
            res.status(200);
            res.send(data);
        }
    });
    lista.catch(function (err){
        resp.status(500);
        resp.end();
        console.log(utils.getFechaCompleta() + " --- ERROR: " + err.message);
    });
};

exports.deleteNote = function (pet, res){
    var idNote = pet.params.idNote;

    Notes.findOne({_id : idNote}, function(err, data){
        if(data == undefined){
            res.status(404);
            res.send("No existe la nota");
        } else {
            data.remove(function(error){
                if(!error) {
                    res.status(204);
                    res.send("Borrada la nota correctamente");
                } else {
                    res.status(500);
                    res.send("Error del servidor al borrar, intentelo de nuevo mas tarde");
                    res.end();
                    console.log(utils.getFechaCompleta() + " --- ERROR: " + error.message)
                }
            });
        }
    });
};

exports.editNote = function(pet, res){
    var updateNote = new Notes(pet.body);
    var idNote = pet.params.idNote;

    if(updateNote.idStation == undefined || updateNote.note == undefined ||
        updateNote.dia == undefined || updateNote.horaInicio == undefined || updateNote.horaFinal == undefined) {
        res.status(400);
        res.send("Faltan campos para poder editar la nota");
    } else {
        Notes.findOne({_id : idNote}, function(err, data){
            if(data == undefined){
                res.status(404);
                res.send("No existe la nota a editar");
            } else {
                data.idStation = updateNote.idStation;
                data.note = updateNote.note;
                data.dia = updateNote.dia;
                data.horaInicio = updateNote.horaInicio;
                data.horaFinal = updateNote.horaFinal;
                Notes.update({_id : idNote}, data, function(err){
                    if(err){
                        console.log(utils.getFechaCompleta() + " --- ERROR: " + err.message);
                        res.status(500);
                        res.send("No se ha podido editar la nota");
                    } else {
                        res.status(202);
                        res.send(data);
                    }
                });
            }
        });
    }
};