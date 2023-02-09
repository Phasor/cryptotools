import logUserIn from "../../services/authService";

export default async function handler(req, res) {
  try {
    const user = await logUserIn(req.body.username, req.body.password);
    //   debug(`user: ${user}`);
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
