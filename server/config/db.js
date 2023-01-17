const mongoose = require("mongoose");
const debug = require("debug")("admin");

const devConnection = process.env.DB_STRING_DEV;
const prodConnection = process.env.DB_STRING_PROD;

const connectDB = async () => {
  if (process.env.NODE_ENV === "production") {
    const db = mongoose.connect(prodConnection, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    mongoose.connection.on("connected", () => {
      debug(`Production database connected to ${mongoose.connection.host}`);
    });
  } else if (process.env.NODE_ENV === "development") {
    const db = mongoose.connect(devConnection, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    mongoose.connection.on("connected", () => {
      console.log(
        `Development database connected to ${mongoose.connection.host}`
      );
    });
  }
};

module.exports = connectDB;
