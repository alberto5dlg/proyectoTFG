const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const HomeSchema = new Schema({
    id:         {type: String},
    nPlantas:   {type: Number},
    plano1:     {type: String},
    plano2:     {type: String},
    plano3:     {type: String},
    plano4:     {type: String},
    plano5:     {type: String},

});

module.exports = mongoose.model('apiHome', HomeSchema);