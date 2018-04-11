var express = require('express');
var app = express();
var http = require('http');
var https = require('https');

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