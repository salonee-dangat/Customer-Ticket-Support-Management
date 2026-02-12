const jwt = require("jsonwebtoken");

// Middleware to verify JWT token from header or cookie
const verifyToken = (req, res, next) => {
  try {
    let token = null;

    // 1️⃣ Check Authorization header first
    const authHeader = req.headers.authorization;
    console.log("Auth header:", authHeader);
    if (authHeader && authHeader.startsWith("Bearer ")) {
      token = authHeader.split(" ")[1];
    }

    // 2️⃣ If not in header, check cookies
    if (!token && req.cookies?.token) {
      console.log("Token found in cookies");
      token = req.cookies.token;
    }

    if (!token) {
      console.warn("No token found in header or cookies");
      return res.status(401).json({ message: "No token provided" });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = {
      id: decoded.id,
      role: decoded.role,
    };

    console.log("Token verified, user:", req.user);

    next();
  } catch (err) {
    console.error("JWT verification failed:", err.message);
    return res.status(401).json({ message: "Invalid token" });
  }
};

// Employee/User access middleware
const allowEmployeeOrUser = (req, res, next) => {
  if (req.user.role === "employee" || req.user.role === "user") return next();
  return res.status(403).json({ message: "Access denied" });
};

// Admin access middleware
const allowAdmin = (req, res, next) => {
  if (req.user.role === "admin") return next();
  return res.status(403).json({ message: "Admin access only" });
};

const allowAdminOrEmployee = (req, res, next) => {
  if (req.user.role === "admin" || req.user.role === "employee") { return next(); }
  return res.status(403).json({ message: "Access denied" });
};


module.exports = { verifyToken, allowEmployeeOrUser, allowAdmin, allowAdminOrEmployee };
