const jwt = require("jsonwebtoken");

// Middleware to verify JWT from cookie
const verifyToken = (req, res, next) => {
  // Read token from cookie
  const token = req.cookies?.token;

  if (!token) {
    return res.status(401).json({ message: "Not authenticated" });
  }

  try {
    // Verify JWT
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // { id, role }
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

// Middleware to allow only employee or user roles
const allowEmployeeOrUser = (req, res, next) => {
  if (req.user.role === "employee" || req.user.role === "user") {
    next();
  } else {
    return res
      .status(403)
      .json({ message: "Only employee or user can create tickets" });
  }
};

module.exports = { verifyToken, allowEmployeeOrUser };
