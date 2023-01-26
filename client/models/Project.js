const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProjectSchema = new mongoose.Schema({
  name: { type: String, required: true },
  image: { type: String, required: true },
  website: { type: String, required: true },
  description: { type: String, required: true },
  active: { type: Boolean, required: true, default: false },
  category: { type: String, required: true, enum: ["tax", "research", "onchain-data", "wallet", "exchange", "other"] },
  rating: { type: String, required: true, enum: ["1", "2", "3", "4", "5"] }
});

const Project = models.Project || mongoose.model("Project", ProjectSchema);
export default Project;

// module.exports = mongoose.model("Project", ProjectSchema);