const Category = require("../../models/Category");

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const category = await Category.find({category:req.query.category});
      res.status(200).json({ success: true, data: category });
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  } else {
    res.status(405).json({ success: false, message: "Invalid request method" });
  }
  res.end();
}
