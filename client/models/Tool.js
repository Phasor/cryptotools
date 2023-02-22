const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ToolSchema = new mongoose.Schema({
  name: { type: String, required: true },
  displayName: { type: String, required: true },
  image: { type: String, required: true },
  website: { type: String, required: true },
  shortDescription: { type: String, required: true },
  longDescription: { type: String, required: true },
  review: { type: String, required: false },
  active: { type: Boolean, required: true, default: false },
  category: { type: Schema.Types.ObjectId, ref: "Category" },
  rating: {
    type: String,
    required: true,
    enum: ["1", "1.5", "2", "2.5", "3", "3.5", "4", "4.5", "5"],
  },
});

// check the model has not already been defined before recreating it, otherwise next.js tries to overwrite the model and ann error throws
module.exports = mongoose.models.Tool || mongoose.model("Tool", ToolSchema);
