const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const passport = require("passport");

router.post("/login", authController.login);
router.post("/authcheck", authController.isauth);

module.exports = router;
