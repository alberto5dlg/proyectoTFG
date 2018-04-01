const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const registerStationsSchema = new Schema({
    nombre:         {type: String},
    ip:             {type: String}
});

module.exports = mongoose.model('registerStations', registerStationsSchema);