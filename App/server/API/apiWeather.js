var express = require('express');
var app = express();
var http = require('http');
var https = require('https');
var Weather = require('../models/apiWheather');

exports.getWeatherZone = function(pet, resp) {
    var options = {
        "method": "GET",
        "hostname": "opendata.aemet.es",
        "path": "/opendata/api/prediccion/especifica/municipio/diaria/03031/?api_key=eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhbGJlcnRvLjUuMTIuOTRAZ21haWwuY29tIiwianRpIjoiNTRjZmNiZjYtNjFhNS00NjRmLWJhOTMtZDQ3NDc1MzBjZDdjIiwiaXNzIjoiQUVNRVQiLCJpYXQiOjE1MjMwOTMyNjgsInVzZXJJZCI6IjU0Y2ZjYmY2LTYxYTUtNDY0Zi1iYTkzLWQ0NzQ3NTMwY2Q3YyIsInJvbGUiOiIifQ.S8CFmpfGmtGyEuESWKY6i3DR9QMcmfH1Ujm0myNVpSg",
        "headers": {
            "cache-control": "no-cache"
        }
    };
    var urlDatos = '';

    var req = https.request(options, function (res) {
        var chunks = [];

        res.on("data", function (chunk) {
            chunks.push(chunk);
        });

        res.on("end", function () {
            var body = Buffer.concat(chunks);
            var variables = JSON.parse(body);

            var req2 = https.get(variables.datos, function(res) {

                var bodyChunks = [];
                res.on('data', function(chunk) {
                    bodyChunks.push(chunk);
                }).on('end', function() {
                    var body = Buffer.concat(bodyChunks);
                    body = JSON.parse(body);
                    resp.send(body);
                })
            });

            req.on('error', function(e) {
                console.log('ERROR: ' + e.message);
                resp.status(404);
                resp.send();
            });
        });
    });
    req.end();
};

exports.saveWeather = function() {
    var options = {
        "method": "GET",
        "hostname": "opendata.aemet.es",
        "path": "/opendata/api/prediccion/especifica/municipio/diaria/03031/?api_key=eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhbGJlcnRvLjUuMTIuOTRAZ21haWwuY29tIiwianRpIjoiNTRjZmNiZjYtNjFhNS00NjRmLWJhOTMtZDQ3NDc1MzBjZDdjIiwiaXNzIjoiQUVNRVQiLCJpYXQiOjE1MjMwOTMyNjgsInVzZXJJZCI6IjU0Y2ZjYmY2LTYxYTUtNDY0Zi1iYTkzLWQ0NzQ3NTMwY2Q3YyIsInJvbGUiOiIifQ.S8CFmpfGmtGyEuESWKY6i3DR9QMcmfH1Ujm0myNVpSg",
        "headers": {
            "cache-control": "no-cache"
        }
    };

    var req = https.request(options, function (res) {
        var chunks = [];

        res.on("data", function (chunk) {
            chunks.push(chunk);
        });

        res.on("end", function () {
            var body = Buffer.concat(chunks);
            var variables = JSON.parse(body);

            var req2 = https.get(variables.datos, function(res) {

                var bodyChunks = [];
                res.on('data', function(chunk) {
                    bodyChunks.push(chunk);
                }).on('end', function() {
                    var body = Buffer.concat(bodyChunks);
                    body = JSON.parse(body);
                    var weather = Weather();
                    weather.poblacion = body[0].nombre;
                    weather.tempMin = body[0].prediccion.dia[0].temperatura.minima;
                    weather.tempMax = body[0].prediccion.dia[0].temperatura.maxima;
                    weather.humMin = body[0].prediccion.dia[0].humedadRelativa.minima;
                    weather.humMax = body[0].prediccion.dia[0].humedadRelativa.maxima;
                    weather.fecha = body[0].elaborado;
                    weather.save(function (error, data) {
                        if(error)
                            console.log('Error al guardar los datos del tiempo: '+ error.message);
                        else
                            console.log('Guardados los datos del tiempo con exito');
                    });
                })
            });

            req.on('error', function(e) {
                console.log('ERROR: ' + e.message);
            });
        });
    });
    req.end();
}