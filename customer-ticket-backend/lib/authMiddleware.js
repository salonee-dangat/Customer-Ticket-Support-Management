const jwt = require("jsonwebtoken");

// Middleware to verify JWT
const verifyToken = (req, res, next) => {
  let token = req.cookies?.token;

  // Also allow Authorization header
  if (!token && req.headers.authorization) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return res.status(401).json({ message: "Not authenticated" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded?.id) {
      return res.status(401).json({ message: "Invalid token payload" });
    }

    req.user = decoded; // { id, role }
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

// Allow employee or user roles
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