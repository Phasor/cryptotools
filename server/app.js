const express = require("express");
require("dotenv").config();
const { graphqlHTTP } = require("express-graphql");
const schema = require("./schema/schema");
const connectDB = require("./config/db");
const cors = require("cors");
const passport = require("passport");
const path = require("path");
const compression = require("compression");
const helmet = require("helmet");

const app = express();

// Pass the global passport object into the configuration function
require("./config/passport")(passport);

// This will initialize the passport object on every request
app.use(passport.initialize());

// connect to db
connectDB();

// match any route on the front end domain
const origin = process.env.FRONTEND_URL ||  /^https:\/\/cryptostatslist-front\.onrender\.com\/.*$/;

app.use(cors({
  origin,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true
}));
app.use(express.json()); // Instead of using body-parser middleware
app.use(express.urlencoded({ extended: true }));
app.use(compression()); // Compress all routes
app.use(helmet()); // Secure all routes
app.use(express.static(path.join(__dirname, "public")));
app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    graphiql: process.env.NODE_ENV === "development",
  })
);
app.use("/auth", require("./routes/auth"));


// app.listen(port, console.log(`Server running on port ${port}`));
module.exports = app;
