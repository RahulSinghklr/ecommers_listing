const express = require("express");
const Product = require("../models/Product");

const router = express.Router();

// Add a Product
router.post("/", async (req, res) => {
  try {
    const newProduct = new Product(req.body);
    await newProduct.save();
    res.json(newProduct);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get Paginated & Filtered Products
router.get("/", async (req, res) => {
  try {
    const { page = 1, limit = 5, category, minPrice, maxPrice } = req.query;
    let filter = {};

    if (category) filter.category = category;
    if (minPrice && maxPrice) filter.price = { $gte: minPrice, $lte: maxPrice };

    const products = await Product.find(filter)
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Product.countDocuments(filter);

    res.json({ products, totalPages: Math.ceil(total / limit), currentPage: page });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
