const Tool = require("../../models/Tool");

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const projects = await Tool.find({ category: req.query.category });
      // check if project exists
      if (projects.length === 0) {
        return res
          .status(404)
          .json({ success: false, message: "No projects found" });
      }
      res.status(200).json({ success: true, data: projects });
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  } else {
    res.status(405).json({ success: false, message: "Invalid request method" });
  }
  res.end();
}
