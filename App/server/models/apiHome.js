const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const HomeSchema = new Schema({
    id:         {type: String},
    nPlantas:   {type: Number},
    plantas:    [String]
});

module.exports = mongoose.model('apiHome', HomeSchema);