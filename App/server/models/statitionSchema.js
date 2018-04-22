const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const utils = require('../utils/utils');

const stationSchema = new Schema({
        idStation:      {type: String},
        nombre:         {type: String},
        temperatura:    {type: Number},
        humedad:        {type: Number},
        fecha:          {type: Date}
});

module.exports = mongoose.model('Station', stationSchema);