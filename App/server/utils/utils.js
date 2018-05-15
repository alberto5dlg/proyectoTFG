var stationRegister = require('../models/registerStationsSchema');
var Station = require('../models/statitionSchema');
var http = require('http');

exports.fechaDeHoy = function(){
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1;
    var yyyy = today.getFullYear();

    if(dd<10) {
        dd='0'+dd;
    }

    if(mm<10) {
        mm='0'+mm;
    }

    today = yyyy+'-'+mm+'-'+dd;
    return today;
};

exports.getHora = function(){
    var hora = new Date();
    var hh = hora.getHours();
    var mm = hora.getMinutes();
    var ss = hora.getSeconds();

    hora = hh+':'+mm+':'+ss;
    return hora;
};

exports.getFechaCompleta = function() {
    var fechaZona = new Date();
    fechaZona.setHours(fechaZona.getHours()+2);
    return fechaZona;
}

function jsonConcat(o1, o2) {
    for (var key in o2) {
        o1[key] = o2[key];
    }
    return o1;
};

function getHostnameUtils(pet) {
    if(pet.hostname ==='localhost'){
        return pet.hostname+':'+pet.app.get('port'); //Por si estamos ejecutando en localhost
    }
    else
        return pet.hostname;
};


exports.getHostname = function(pet) {
    if(pet.hostname ==='localhost'){
        return pet.hostname+':'+pet.app.get('port'); //Por si estamos ejecutando en localhost
    }
    else
        return pet.hostname;
};

exports.getDataAllStations = function(){
    var lista = stationRegister.find();

    lista.then(function (stations){
        for(var i = 0; i < stations.length; i++){
            var req = http.get('http://'+stations[i].ip, function(res) {
                var bodyChunks = [];
                res.on('data', function(chunk) {
                    bodyChunks.push(chunk);
                }).on('end', function() {
                    var body = Buffer.concat(bodyChunks);
                    var variables = JSON.parse(body);
                    saveDataStation(variables);
                })
            });
            req.on('error', function(e) {
                console.log('ERROR: ' + e.message);
            });
        }
    });
};

exports.almacenarPruebas = function(temp, hum, dia) {
    var newStation = Station();
    newStation.idStation = 'sensor_pruebas';
    newStation.nombre = 'Pruebas';
    newStation.fecha = this.getFechaCompleta();
    newStation.dia = dia;
    newStation.hora = this.getHora();
    newStation.temperatura = temp;
    newStation.humedad = hum;
    newStation.save(function (error, sta){
        if(error)
            console.log('Error al guardar los datos: '+ error.message);
        else
            console.log('Guardados los datos con exito de: sensor_pruebas');
    })
};