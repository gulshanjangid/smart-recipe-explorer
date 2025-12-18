const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Database Connection
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/smart-recipe-explorer')
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.error('MongoDB Connection Error:', err));

// Routes
const recipeRoutes = require('./routes/recipes');
const aiRoutes = require('./routes/ai');

app.use('/api/recipes', recipeRoutes);
app.use('/api/ai', aiRoutes);

app.get('/', (req, res) => {
    res.send('Smart Recipe Explorer API is running');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
