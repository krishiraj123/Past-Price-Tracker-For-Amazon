const mongoose = require('mongoose');

const productSchema = new mongoose.Schema
(
  {
    url: { type: String, required: true, unique: true },
    currency: { type: String, required: true },
    title: { type: String, required: true },
    currentPrice: { type: Number, required: true },
    originalPrice: { type: Number, required: true },
    priceHistory: [
      {
        price: { type: Number, required: true },
        date: { type: Date, default: Date.now },
      },
    ],
    outOfStock: { type: Boolean, default: false },
    imageUrl: { type: String, required: true },
    discountRate: { type: Number },
    description: { type: String },
    stars: { type: String },
    reviews: { type: String },
    lowestPrice: { type: Number, default: 0 },
    highestPrice: { type: Number, default: 0 },
    averagePrice: { type: Number, default: 0 },
    users: [
     {
      email: { type: String, required: true},
      price: {type: Number,required: true}
     }
    ], default: [],
  },
);

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
