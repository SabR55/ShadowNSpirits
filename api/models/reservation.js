const mongoose = require('mongoose');
const {Schema} = mongoose;

const ReservationSchema = new Schema({
    resId: String,
    resName: String,
    resEmail: String,
    resPhone: String,
    resDate: String,
    resTime: String,
    resGuests: Number,
    resDateCreated: { type: Date, default: Date.now },
    resNum: String,
    resStatus: String
});

const ResModel = mongoose.model('reservations', ReservationSchema);

module.exports = ResModel;