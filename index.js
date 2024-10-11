const express = require('express');
const mongoose = require('mongoose');
const app = express();
const cors = require('cors');

// Middleware to parse incoming JSON
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:5173'
 }));

 app.use(cors({
    origin: 'http://localhost:5173',
    methods: 'GET,POST,PUT,DELETE',
    allowedHeaders: 'Content-Type,Authorization'
 }));
 

// MongoDB connection string
const mongoURI = 'mongodb+srv://sudharsan6078:mIv245QBZmaLTGIp@final.rky74.mongodb.net/'; // Change this to your MongoDB URI
mongoose.connect(mongoURI)

// Define a simple route


// Define a User Schema and Model
const UserSchema = new mongoose.Schema({
    name: String,
    email: String,
    dept : String,
    college : String,
});

const User = mongoose.model('User', UserSchema);

// API to create a new user
app.post('/', async (req, res) => {
    const newUser = new User(req.body);
    try {
        const savedUser = await newUser.save();
        res.json(savedUser);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// API to get all users
app.get('/', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Start the Express server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
