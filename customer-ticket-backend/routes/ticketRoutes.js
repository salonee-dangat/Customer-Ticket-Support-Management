const express = require("express");
const router = express.Router();

const { createTicket } = require("../controllers/ticketController");
const {
  verifyToken,
  allowEmployeeOrUser,
} = require("../lib/authMiddleware");

router.post("/", (req, res, next) => {
  console.log("POST /api/tickets HIT");
  console.log(req.body);
  next();
}
);

module.exports = router;
