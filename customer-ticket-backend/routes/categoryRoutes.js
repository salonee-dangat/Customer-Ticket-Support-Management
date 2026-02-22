const express = require("express");
const Category = require("../models/Category");
const router = express.Router();

// Create category
router.post("/", async (req, res) => {
  const category = await Category.create(req.body);
  res.json(category);
});

// Get all categories
router.get("/", async (req, res) => {
  const categories = await Category.find();
  res.json(categories);
});

module.exports = router;
