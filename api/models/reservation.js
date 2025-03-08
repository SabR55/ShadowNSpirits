const mongoose = require('mongoose');
const {Schema} = mongoose;

const ReservationSchema = new Schema({
    resId: String,
    resName: String,
    resEmail: String,
    resPhone: String,
    resDate: String,
    resTime: String,
    resNumOfGuests: Number,
    resDateCreated: { type: Date, default: Date.now },
    resNum: String,
    resStatus: String
});

const ResModel = mongoose.model('reservations', ReservationSchema);

module.exports = ResModel;


// Pre-save middleware to generate and validate unique reservation number
// ReservationSchema.pre('save', async function(next) {
//     // Only generate a new resNum if one doesn't exist already
//     if (!this.resNum) {
//         let isUnique = false;
//         let randomNumber;
        
//         // Keep trying until we find a unique number
//         while (!isUnique) {
//             randomNumber = generateRandomNumber();
            
//             // Check if this number already exists in the database
//             const existingReservation = await this.constructor.findOne({ resNum: randomNumber });
            
//             if (!existingReservation) {
//                 isUnique = true;
//                 this.resNum = randomNumber;
//             }
//         }
//     }
//     next();
// });