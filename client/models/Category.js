const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CategorySchema = new mongoose.Schema({
  category: { type: String, required: true },
  description: { type: String, required: true },
});

// check the model has not already been defined before recreating it, otherwise next.js tries to overwrite the model and ann error throws
module.exports =
  mongoose.models.Category || mongoose.model("Category", CategorySchema);
