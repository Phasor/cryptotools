import Category from "../../models/Category";
import { verifyJWT } from "../../utils/utils";
const xss = require("xss");

export default async function handler(req, res) {
  // check if they have sent a token
  if (!req.headers.authorization) {
    return res.status(401).json({ success: false, message: "Unauthorized" });
  }

  if (req.method === "POST") {
    // verify the token
    const token = req.headers.authorization.split(" ")[1];
    try {
      const decodedToken = await verifyJWT(token);
    } catch (err) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    try {
      // sanitize and trim the data
      const categoryName = xss(req.body.category.trim());
      const description = xss(req.body.description.trim());

      // create a new Tool
      const category = new Category({
        description,
        category: categoryName,
      });
      const savedCategory = await category.save();
      return res.status(200).json({ success: true, data: savedCategory });
    } catch (err) {
      return res.status(500).json({ success: false, message: err.message });
    }
  } else {
    return res
      .status(405)
      .json({ success: false, message: "Invalid request method" });
  }
}
