const mongoose = require("mongoose");

const LinkSchema = new mongoose.Schema({
  name: { type: String },
  url: { type: String },
  active: { type: Boolean },
  project: { type: mongoose.Schema.Types.ObjectId, ref: "Project" },
});

module.exports = mongoose.model("Link", LinkSchema);
