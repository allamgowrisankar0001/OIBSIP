const express = require('express');
const router = express.Router();
const Order = require('../model/OrderModel');

// Create an order
router.post('/', async (req, res) => {
  try {
    const { userId, base, sauce, cheese, veggies, total } = req.body;
    if (!userId || !base || !sauce || !cheese || typeof total !== 'number') {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const order = await Order.create({ userId, base, sauce, cheese, veggies: veggies || [], total });
    res.status(201).json({ message: 'Order created', order });
  } catch (err) {
    console.error('Order creation error', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Get orders for a user
router.get('/', async (req, res) => {
  try {
    const { userId } = req.query;
    if (!userId) return res.status(400).json({ message: 'userId is required' });

    const orders = await Order.find({ userId }).sort({ createdAt: -1 });
    res.status(200).json({ orders });
  } catch (err) {
    console.error('Fetch orders error', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
