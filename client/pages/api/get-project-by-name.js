import dbConnect from "../../utils/dbConnect";
import Tool from "../../models/Tool";
import Category from "../../models/Category";

export default async function handler(req, res) {
  await dbConnect();
  if (req.method === "GET") {
    try {
      const project = await Tool.find({ name: req.query.name }).populate(
        "category"
      );
      // check if project exists
      if (project.length === 0) {
        console.log("Project not found");
        return res
          .status(404)
          .json({ success: false, message: "Project not found" });
      }
      res.status(200).json({ success: true, data: project });
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  } else {
    res.status(405).json({ success: false, message: "Invalid request method" });
  }
}
