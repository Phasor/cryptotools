require("dotenv").config({ path: ".env" });
const express = require("express");
const next = require("next");
const mongoose = require("mongoose");

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

const connectionString =
  process.env.NODE_ENV == "development"
    ? process.env.DB_STRING_DEV
    : process.env.DB_STRING_PROD;

const connectToMongoDB = async () => {
  mongoose.connect(
    connectionString,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
    (err) => {
      if (err) {
        console.error(err);
      } else {
        console.log(`Database connected to ${mongoose.connection.host}`);
      }
    }
  );
};

app.prepare().then(() => {
  const server = express();

  connectToMongoDB();

  // tells express to send all requests to next.js server so the /pages routes are handled
  server.get("*", (req, res) => {
    return handle(req, res);
  });

  server.post("*", (req, res) => {
    return handle(req, res);
  });

  server.listen(3000, (err) => {
    if (err) throw err;
    console.log("> Ready on http://localhost:3000");
  });
});
