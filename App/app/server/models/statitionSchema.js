import ongoose from 'mongoose';

const Schema = mongoose.Schema;
mongoose.Promise = global.Promise;

const stationSchema = new Schema({
        nombre:         {type: String, default:''},
        temperatura:    {type: Schema.Decimal, default:''},
        humedad:        {type: Schema.Decimal, default:''},
        fecha:          {type: Schema.Date, default:''},
        hora:           {type: Schema.Date, default:''}
});

export { stationSchema };