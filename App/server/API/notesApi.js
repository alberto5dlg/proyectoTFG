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