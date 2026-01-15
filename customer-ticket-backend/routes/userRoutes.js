const express = require("express");
const router = express.Router();

// Example users (demo for showing frontend)
const exampleUsers = [
  { _id: 1, name: "Neha", email: "neha@example.com", role: "admin" },
  { _id: 2, name: "Saloni", email: "saloni12@example.com", role: "user" },
];

// GET all users
router.get("/", (req, res) => {
  res.json(exampleUsers);
});

// You can add POST later if needed
// router.post("/", (req, res) => { ... });

module.exports = router;
