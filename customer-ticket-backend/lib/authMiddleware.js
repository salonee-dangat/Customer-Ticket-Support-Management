const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Token missing or invalid" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // { id, role }
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

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
