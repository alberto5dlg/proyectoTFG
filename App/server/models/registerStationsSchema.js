const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const registerStationsSchema = new Schema({
    id:         {type: String},
    ip:         {type: String},
    nombre:     {type: String}

});

module.exports = mongoose.model('registerStations', registerStationsSchema);