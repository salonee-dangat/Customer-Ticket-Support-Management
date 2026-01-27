const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

// Example users (ObjectId based – SAFE for pagination & tickets)
const exampleUsers = [
  {
    _id: new mongoose.Types.ObjectId(),
    name: "Neha",
    email: "neha@example.com",
    role: "admin",
  },
  {
    _id: new mongoose.Types.ObjectId(),
    name: "Saloni",
    email: "saloni12@example.com",
    role: "user",
  },
];

console.log("USER ROUTES FILE LOADED");

// GET users
router.get("/", (req, res) => {
  res.json(exampleUsers);
});

module.exports = router;