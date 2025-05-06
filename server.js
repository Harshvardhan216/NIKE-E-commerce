// Import required modules
const express = require('express');
const bodyParser = require('body-parser');

// Create an instance of Express app
const app = express();

// Middleware to parse JSON request bodies
app.use(bodyParser.json());

// Mock database to store cart items
let cart = [];

// Route to add item to the cart
app.post('/api/cart/add', (req, res) => {
    const newItem = req.body;
    cart.push(newItem);
    res.status(201).json({ message: 'Item added to cart', cart });
});

// Route to process checkout
app.post('/api/checkout', (req, res) => {
    const { name, phoneNumber, address, cardNumber, expiryMonth, expiryYear, cvv } = req.body;
    // Process checkout logic here (e.g., validate inputs, charge payment, send confirmation email)
    // For simplicity, let's just clear the cart
    cart = [];
    res.status(200).json({ message: 'Checkout successful' });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
