const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const Reservation = require('./models/reservation');
require('dotenv').config();

const port = 3000;
const app = express();

app.use(express.json());

app.use(cors({
    credentials: true,
    origin: 'http://localhost:5173'
}));

// MongoDB Connection
const url = process.env.MONGODB_URL;

mongoose.connect(url, {})
.then(result => console.log("Database is connected"))
.catch(err => console.log(err))


app.get('/test', (req,res) => {
    res.json('test ok');
});

app.post('/makeReservation', async (req, res) => {
    try {
        const formData = req.body;

        // Find the last reservation to get the latest ID
        const lastReservation = await Reservation.findOne().sort({ _id: -1 });
        
        // Generate new ID - if no previous reservation, start with "001"
        let resId;
        if (!lastReservation) {
            resId = "001";
        } else {
            // Convert the last ID to number, add 1, then format back to 3-digit string
            const lastIdNum = parseInt(lastReservation.resId);
            resId = (lastIdNum + 1).toString().padStart(3, '0');
        }

        // Generate a unique 5-digit reservation number
        let randomResNum;
        let isUnique = false;
        
        while (!isUnique) {
            // Generate a random 5-digit number (between 10000 and 99999)
            randomResNum = Math.floor(10000 + Math.random() * 90000).toString();
            
            // Check if this reservation number already exists in the database
            const existingReservation = await Reservation.findOne({ resId: randomResNum });
            
            // If no reservation with this number exists, it's unique
            if (!existingReservation) {
                isUnique = true;
            }
        }
        
        // Create a new reservation document with the form data
        const newReservation = await Reservation.create({
            resId: resId,
            resName: formData.name,
            resEmail: formData.email,
            resPhone: formData.phone,
            resDate: formData.date,
            resTime: formData.time,
            resNumOfGuests: formData.guests,
            resDateCreated: new Date(),
            resNum: randomResNum,
            resStatus: "1",
        });
        
        // Send success response with the created reservation
        res.status(201).json({
            success: true,
            message: 'Reservation created successfully',
            data: newReservation
        });
    } catch (error) {
        console.error('Reservation creation error:', error);
        
        // Send error response
        res.status(500).json({
            success: false,
            message: 'Failed to create reservation',
            error: error.message
        });
    }
});

// app.get()

app.listen(port, () => {
    console.log("Server is running at port " + port)
})
