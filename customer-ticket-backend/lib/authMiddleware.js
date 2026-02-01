const jwt = require("jsonwebtoken");

// Verify JWT
const verifyToken = (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) return res.status(401).json({ message: "Not authenticated" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { id: decoded.id, role: decoded.role };
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

// Employee/User access
const allowEmployeeOrUser = (req, res, next) => {
  if (req.user.role === "employee" || req.user.role === "user") return next();
  return res.status(403).json({ message: "Access denied" });
};

// Admin access
const allowAdmin = (req, res, next) => {
  if (req.user.role === "admin") return next();
  return res.status(403).json({ message: "Admin access only" });
};

module.exports = { verifyToken, allowEmployeeOrUser, allowAdmin };
