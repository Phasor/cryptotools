import Tool from "../../models/Tool";
import { verifyJWT } from "../../utils/utils";

export default async function handler(req, res) {
  // check if they have sent a token
  if (!req.headers.authorization) {
    return res.status(401).json({ success: false, message: "Unauthorized" });
  }

  if (req.method === "POST") {
    const toolId = req.body.id;
    // verify the token
    const token = req.headers.authorization.split(" ")[1];
    try {
      const decodedToken = await verifyJWT(token);
    } catch (err) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    try {
      await Tool.findByIdAndDelete(toolId);
      return res
        .status(200)
        .json({ success: true, message: "Tool deleted successfully" });
    } catch (err) {
      return res.status(500).json({ success: false, message: "Server error" });
    }
  } else {
    return res
      .status(405)
      .json({ success: false, message: "Invalid request method" });
  }
}
