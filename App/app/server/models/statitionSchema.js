const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const stationSchema = new Schema({
        nombre:         {type: String},
        temperatura:    {type: Number},
        humedad:        {type: Number},
        fecha:          {type: Date},
        hora:           {type: Date}
});

module.exports = mongoose.model('Station', stationSchema);