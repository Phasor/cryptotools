const mongoose = require("mongoose");

const LinkSchema = new mongoose.Schema({
  name: { type: String },
  url: { type: String },
  active: { type: Boolean },
});

module.exports = mongoose.model.("Link", LinkSchema);