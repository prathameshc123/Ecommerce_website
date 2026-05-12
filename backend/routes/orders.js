const express = require('express');
const router = express.Router();
const { createOrder, getUserOrders, getSingleOrder } = require('../controllers/orderController');
const { protect } = require('../middleware/auth');

// All order routes are protected
// POST /api/orders
router.post('/', protect, createOrder);

// GET /api/orders
router.get('/', protect, getUserOrders);

// GET /api/orders/:id
router.get('/:id', protect, getSingleOrder);

module.exports = router;
