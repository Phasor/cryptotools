const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProjectSchema = new mongoose.Schema({
  name: { type: String, required: true },
  symbol: { type: String, required: false },
  image: { type: String, required: true },
  website: { type: String, required: true },
  active: { type: Boolean, required: true, default: false },
  links: [
    {
      type: Schema.Types.ObjectId,
      ref: "Link",
      default: [],
      required: false,
    },
  ],
});

module.exports = mongoose.model("Project", ProjectSchema);
