const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProjectSchema = new mongoose.Schema({
  name: { type: String },
  website: { type: String },
  active: { type: Boolean },
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
