import dbConnect from "../../utils/dbConnect";
import Tool from "../../models/Tool";

export default async function handler(req, res) {
  await dbConnect();
  if (req.method === "GET") {
    try {
      const projects = await Tool.find({ active: true }).populate("category");
      res.status(200).json({ success: true, data: projects });
    } catch (err) {
      res.status(500).json({ success: false, message: "in catch block: Server error" });
    }
  } else {
    res.status(405).json({ success: false, message: "Invalid request method" });
  }
  res.end();
}
