const express = require('express');
const mongoose = require('mongoose');
const Item = require('./models/item');

const app = express();
app.use(express.static('public'));
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/shopping_cart', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch(err => {
        console.error('Error connecting to MongoDB:', err);
    });

// Define routes
app.get('/api/cart', async (req, res) => {
    try {
        const items = await Item.find();
        res.json(items);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
