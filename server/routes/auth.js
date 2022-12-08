const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const passport = require("passport");

router.post("/login", authController.login);
module.exports = router;
