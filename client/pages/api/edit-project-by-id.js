import Tool from "../../models/Tool";
import { verifyJWT } from "../../utils/utils";
const xss = require("xss");

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
      // sanitize and trim the data
      const name = req.body.formData.name
        ? xss(req.body.formData.name.trim())
        : "";
      const image = req.body.formData.image
        ? xss(req.body.formData.image.trim())
        : "";
      const website = req.body.formData.website
        ? xss(req.body.formData.website.trim())
        : "";
      const shortDescription = req.body.formData.shortDescription
        ? xss(req.body.formData.shortDescription.trim())
        : "";
      const longDescription = req.body.formData.longDescription
        ? xss(req.body.formData.longDescription.trim())
        : "";
      const review = req.body.formData.review
        ? xss(req.body.formData.review.trim())
        : "";
      const category = req.body.formData.category
        ? xss(req.body.formData.category)
        : "other";
      const rating = req.body.formData.rating
        ? xss(req.body.formData.rating)
        : "1";
      const active = req.body.formData.active
        ? xss(req.body.formData.active)
        : false;

      await Tool.findByIdAndUpdate(
        toolId,
        {
          name,
          image,
          website,
          shortDescription,
          longDescription,
          review,
          active,
          category,
          rating,
        },
        { new: true }
      );

      return res
        .status(200)
        .json({ success: true, message: "Tool updated successfully" });
    } catch (err) {
      console.log(JSON.stringify(err.message));
      return res.status(500).json({ success: false, message: err.message });
    }
  } else {
    return res
      .status(405)
      .json({ success: false, message: "Invalid request method" });
  }
}
