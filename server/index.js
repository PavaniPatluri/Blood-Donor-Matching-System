const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

const donorRoutes = require('./routes/donorRoutes');

app.use(cors());
app.use(express.json());

app.use('/api/donors', donorRoutes);

app.get('/', (req, res) => {
    res.send('Blood Donor Emergency Platform API is running...');
});

// Connect to MongoDB
// mongoose.connect(process.env.MONGODB_URI)
//     .then(() => console.log('MongoDB connected'))
//     .catch(err => console.error('MongoDB connection error:', err));

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
