const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '../.env') });

const Product = require('../models/Product');

const products = [
  {
    name: 'Apple iPhone 15 Pro',
    description: 'Latest Apple flagship smartphone with A17 Pro chip, titanium design, and advanced camera system with 48MP main sensor.',
    price: 999.99,
    category: 'Electronics',
    image: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=400&h=300&fit=crop',
    stock: 50,
  },
  {
    name: 'Samsung Galaxy S24 Ultra',
    description: 'Premium Android smartphone with built-in S Pen, 200MP camera, and Snapdragon 8 Gen 3 processor.',
    price: 1199.99,
    category: 'Electronics',
    image: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=400&h=300&fit=crop',
    stock: 35,
  },
  {
    name: 'Sony WH-1000XM5 Headphones',
    description: 'Industry-leading noise cancelling wireless headphones with up to 30-hour battery life and crystal-clear audio.',
    price: 349.99,
    category: 'Electronics',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop',
    stock: 80,
  },
  {
    name: 'Nike Air Max 270',
    description: 'Stylish and comfortable sneakers featuring Max Air cushioning for all-day comfort and modern street style.',
    price: 149.99,
    category: 'Clothing',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=300&fit=crop',
    stock: 120,
  },
  {
    name: 'Levi\'s 501 Original Jeans',
    description: 'The original straight fit jeans with button fly closure. Iconic American style in premium denim fabric.',
    price: 59.99,
    category: 'Clothing',
    image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&h=300&fit=crop',
    stock: 200,
  },
  {
    name: 'The Pragmatic Programmer',
    description: 'A classic software engineering book covering best practices, tips, and philosophy for modern software development.',
    price: 39.99,
    category: 'Books',
    image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&h=300&fit=crop',
    stock: 60,
  },
  {
    name: 'Clean Code by Robert Martin',
    description: 'A handbook of agile software craftsmanship teaching how to write readable, maintainable, and elegant code.',
    price: 34.99,
    category: 'Books',
    image: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?w=400&h=300&fit=crop',
    stock: 75,
  },
  {
    name: 'Instant Pot Duo 7-in-1',
    description: 'Multi-use pressure cooker that works as a slow cooker, rice cooker, steamer, saute pan, yogurt maker, and warmer.',
    price: 89.99,
    category: 'Home & Kitchen',
    image: 'https://images.unsplash.com/photo-1585515656973-f01e1f86d2a7?w=400&h=300&fit=crop',
    stock: 45,
  },
  {
    name: 'Yoga Mat Premium',
    description: 'Non-slip eco-friendly yoga mat with alignment lines, extra thick 6mm cushioning for joint support during workouts.',
    price: 49.99,
    category: 'Sports',
    image: 'https://images.unsplash.com/photo-1601925228993-19f5e7b0fe04?w=400&h=300&fit=crop',
    stock: 90,
  },
  {
    name: 'MacBook Air M2',
    description: 'Apple MacBook Air with M2 chip, 13.6-inch Liquid Retina display, 8GB RAM, 256GB SSD, fanless design.',
    price: 1099.99,
    category: 'Electronics',
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=300&fit=crop',
    stock: 25,
  },
  {
    name: 'LEGO Star Wars Millennium Falcon',
    description: 'Iconic LEGO set featuring the legendary Millennium Falcon with detailed interior, 4 minifigures included. 1351 pieces.',
    price: 169.99,
    category: 'Toys',
    image: 'https://images.unsplash.com/photo-1615461066841-6116e61058f4?w=400&h=300&fit=crop',
    stock: 30,
  },
  {
    name: 'CeraVe Moisturizing Cream',
    description: 'Daily face and body moisturizer for dry skin with hyaluronic acid, ceramides, and MVE technology for 24-hour hydration.',
    price: 19.99,
    category: 'Beauty',
    image: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=400&h=300&fit=crop',
    stock: 150,
  },
];

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connected to MongoDB Atlas');

    // Clear existing products
    await Product.deleteMany({});
    console.log('🗑️  Cleared existing products');

    // Insert new products
    const inserted = await Product.insertMany(products);
    console.log(`✅ Successfully seeded ${inserted.length} products!`);

    console.log('\n📦 Products seeded:');
    inserted.forEach((p, i) => {
      console.log(`  ${i + 1}. ${p.name} — ₹${p.price} [${p.category}]`);
    });

    process.exit(0);
  } catch (error) {
    console.error('❌ Seed error:', error.message);
    process.exit(1);
  }
};

seedDB();
