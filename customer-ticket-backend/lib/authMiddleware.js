const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  try {
    let token;

    if (req.cookies && req.cookies.token) {
      token = req.cookies.token;
    } else if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer ")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // ✅ SAFE FIX HERE
    req.user = {
      id: decoded.id || decoded._id,
      role: decoded.role,
    };

    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

const allowEmployeeOrUser = (req, res, next) => {
  if (
    req.user.role === "employee" ||
    req.user.role === "user" ||
    req.user.role === "admin"
  ) {
    return next();
  }
  return res.status(403).json({ message: "Access denied" });
};

const allowAdmin = (req, res, next) => {
  if (req.user.role === "admin") {
    return next();
  }
  return res.status(403).json({ message: "Admin access only" });
};

module.exports = { verifyToken, allowEmployeeOrUser, allowAdmin };