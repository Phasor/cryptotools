const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: { type: String, required: true, default: "default" },
  hash: { type: String, required: true, default: "default" },
  salt: { type: String, required: true, default: "default" },
});

// Virtual for user's URL
UserSchema.virtual("url").get(function () {
  // We don't use an arrow function as we'll need the this object
  return `/user/${this._id}`;
});

module.exports = mongoose.model("User", UserSchema);
