const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const weatherSchema = new Schema({
    poblacion:  {type: String},
    tempMax:    {type: String},
    tempMin:    {type: String},
    humMax:     {type: String},
    humMin:     {type: String},
    fecha:      {type: String}
});

module.exports = mongoose.model('Weather', weatherSchema);