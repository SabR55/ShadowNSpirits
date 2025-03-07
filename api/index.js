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
        
        // Create a new reservation document with the form data
        const newReservation = await Reservation.create({
            id:'001',
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            date: formData.date,
            time: formData.time,
            guests: formData.guests,
            createdAt: new Date(),
            resNum: '12345',
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

app.listen(port, () => {
    console.log("Server is running at port " + port)
})
