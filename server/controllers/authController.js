const { logUserIn } = require("../services/authService");
const { verifyJWT, getUserIDFromToken } = require("../lib/utils");

exports.login = async (req, res) => {
  try {
    const user = await logUserIn(req.body.username, req.body.password);
    console.log(`user: ${user}`);
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
    console.log(error);
    res.json({
      success: false,
      message: `${error.name}, ${error.message}`,
    });
  }
};

// function below checks if the user is logged in, checks the jwt is valid
exports.isauth = async (req, res) => {
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
  };

    
