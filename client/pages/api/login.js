import logUserIn from "../../services/authService";
import allowCors from "../../utils/allowCors";

async function handler(req, res) {
  try {
    const user = await logUserIn(req.body.username, req.body.password);
    console.log(`user: ${user}`);
    if (user.success) {
      res.status(200).json({
        success: true,
        token: user.tokenObject.token,
        expiresIn: user.tokenObject.expires,
        user: user.user,
      });
    } else {
      res.status(401).json({ success: false, message: user.message });
    }
  } catch (error) {
    //   debug(`error: ${error}`);
    res.json({
      success: false,
      message: `${error.name}, ${error.message}`,
    });
  }
}

// wrap the handler function with the allowCors function
export default allowCors(handler);
