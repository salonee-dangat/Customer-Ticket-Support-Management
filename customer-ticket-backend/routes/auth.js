const express = require("express");
const User = require("../models/User");
const { createToken } = require("../lib/auth");

const router = express.Router();

router.post("/register", async (req, res) => {
    try {
        const {name, email, password } = req.body;

        if(!name || !email || !password) {
            return res.status(400).json ({
                message: "All field are required",
            });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json ({
                 message: "User already exists",
      });
    }

    // create user
    const user = await User.create({
      name,
      email,
      password,
    });

    // generate token
    const token = createToken(user);

    res.status(201).json({
      message: "User registered successfully",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Server error",
    });
  }
});

module.exports = router;