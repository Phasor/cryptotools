import dbConnect from "../../utils/dbConnect";
import Tool from "../../models/Tool";

export default async function handler(req, res) {
  await dbConnect();
  if (req.method === "GET") {
    try {
      // collation needed to sort string numbers correctly
      const projects = await Tool.find({ active: true })
        .populate("category")
        .sort({ rating: -1 })
        // .collation({ locale: "en_US", numericOrdering: true });
      res.status(200).json({ success: true, data: projects });
    } catch (err) {
      res
        .status(500)
        .json({ success: false, message: "in catch block: Server error" });
    }
  } else {
    res.status(405).json({ success: false, message: "Invalid request method" });
  }
  res.end();
}
