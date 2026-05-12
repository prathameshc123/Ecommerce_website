const express = require('express');
const router = express.Router();
const {
  getAllProducts,
  getProductById,
  searchProducts,
  getProductsByCategory,
} = require('../controllers/productController');

// IMPORTANT: specific routes before param routes
// GET /api/products/search?query=
router.get('/search', searchProducts);

// GET /api/products/category/:category
router.get('/category/:category', getProductsByCategory);

// GET /api/products
router.get('/', getAllProducts);

// GET /api/products/:id
router.get('/:id', getProductById);

module.exports = router;
