const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const port = 3000;
const app = express();

app.use(express.json());

app.use(cors({
    credentials: true,
    origin: 'http://localhost:5173'
}));

// MongoDB Connection
// afij3bSEAY8TSQyo
const url = process.env.MONGODB_URL;

console.log(url);


mongoose.connect(url, {})
.then(result => console.log("Database is connected"))
.catch(err => console.log(err))


app.get('/test', (req,res) => {
    res.json('test ok');
});

app.post('/makeReservation', (req,res) => {
    const formData = req.body;
    
    res.json({formData});
});

app.listen(port, () => {
    console.log("Server is running at port " + port)
})
