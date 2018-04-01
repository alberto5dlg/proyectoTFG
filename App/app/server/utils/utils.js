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

    today = dd+'/'+mm+'/'+yyyy;
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