import dbConnect from "../../utils/dbConnect";
const Tool = require("../../models/Tool");
const Category = require("../../models/Category");

export default async function handler(req, res) {
  await dbConnect();
  if (req.method === "GET") {
    try {
      // find the Category object ID of the category we are searching for
      const category = await Category.findOne({ category: req.query.category });
      const categoryObjId = category._id;
      const projects = await Tool.find({ category: categoryObjId }).populate(
        "category"
      );

      // check if project exists
      if (projects.length === 0) {
        return res
          .status(404)
          .json({ success: false, message: "No projects found" });
      }
      return res.status(200).json({ success: true, data: projects });
    } catch (err) {
      return res.status(500).json({ success: false, message: err.message });
    }
  } else {
    res.status(405).json({ success: false, message: "Invalid request method" });
  }
  res.end();
}
