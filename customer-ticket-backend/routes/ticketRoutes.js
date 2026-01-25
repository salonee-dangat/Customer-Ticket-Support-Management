const express = require("express");
const router = express.Router();

const { createTicket } = require("../controllers/ticketController");
const {
  verifyToken,
  allowEmployeeOrUser,
} = require("../lib/authMiddleware");

router.post(
  "/create",
  verifyToken,
  allowEmployeeOrUser,
  createTicket
);

module.exports = router;
