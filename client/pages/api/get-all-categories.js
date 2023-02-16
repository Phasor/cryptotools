const Category = require("../../models/Category");

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const categories = await Category.find({})
      res.status(200).json({ success: true, data: categories });
    } catch (err) {
      res.status(500).json({ success: false, message: "Server error" });
    }
  } else {
    res.status(405).json({ success: false, message: "Invalid request method" });
  }
  res.end();
}
