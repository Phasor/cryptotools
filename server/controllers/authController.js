const { logUserIn } = require("../services/authService");
const { verifyJWT, getUserIDFromToken } = require("../lib/utils");
const { body, validationResult } = require("express-validator");
const debug = require("debug")("admin");

exports.login = [

  // Validate and sanitize fields.
  body("username", "Username must be specified.")
    .trim()
    .isLength({ min: 1 })
    .withMessage("Username is not valid.")
    .escape(),
  body("password", "Password must not be empty.")
    .trim()
    .isAlphanumeric()
    .isLength({ min: 4 })
    .withMessage("Password must be at least 4 characters long.")
    .escape(),

    // process request after validation and sanitization

  async (req, res) => {
    try {
      const user = await logUserIn(req.body.username, req.body.password);
      debug(`user: ${user}`);
      if (user.success) {
        res.json({
          success: true,
          token: user.tokenObject.token,
          expiresIn: user.tokenObject.expires,
          user: user.user,
        });
      } else {
        res.status(401).json({ success: false, message: user.message });
      }
    } catch (error) {
      debug(`error: ${error}`);
      res.json({
        success: false,
        message: `${error.name}, ${error.message}`,
      });
    }
  }
];

// function below checks if the user is logged in, checks the jwt is valid

exports.isauth = [
  // Validate and sanitize fields.
  body("token", "Token must be specified.")
    .trim()
    .isLength({ min: 1 })
    .withMessage("Token is not valid.")
    .escape(),

    // process request after validation and sanitization
  async (req, res) => {
    try {
      const token = req.headers.authorization.split(" ")[1];
      // console.log(`token: ${token}`);
      const verified = await verifyJWT(token);
      // console.log(`verified: ${verified}`);
      if (verified) {
        res.json({success: true, user: verified.sub});
        } else {
          res.json({success: false, message: "Invalid token"});
        }
      } catch(error) {
        console.log(error);
        res.json({success: false, message: "Something went wrong"});
      }
    }
  ];

    
