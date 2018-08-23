const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const notesSchema = new Schema({
    idStation:      {type: String},
    note:           {type: String},
    fecha:          {type: Date},
    dia:            {type: String},
    horaInicio:     {type: String},
    horaFinal:      {type: String}
});

module.exports = mongoose.model('Notes', notesSchema);