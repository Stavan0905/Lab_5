const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const productRoutes = require('./routes/products');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://127.0.0.1:27017/ecommerce', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
app.use('/images', express.static('public/images'));
app.use('/api/products', productRoutes);

app.listen(3000, () => console.log('✅ Server running on http://localhost:3000'));