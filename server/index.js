require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("../config/db");
const { graphqlHTTP } = require("express-graphql");
const schema = require("./schema/schema");

const app = express();

connectDB();
app.use(cors());
app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: process.env.NODE_ENV === "development",
  })
);

app.listen(
  process.env.PORT || 5000,
  console.log(`Server running on port ${process.env.PORT || 5000}`)
);

module.exports = app;
