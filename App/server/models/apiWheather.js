const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const weatherSchema = new Schema({
    id:         {type: String},
    poblacion:  {type: Number},
    tempMax:    {type: String},
    tempMin:    {type: String},
    humMax:     {type: String},
    humMin:     {type: String}
});

module.exports = mongoose.model('apiWeather', weatherSchema);