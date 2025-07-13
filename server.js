// Importing Express
const express = require("express");
const dotenv = require("dotenv");
const path=require("path");

// Importing dotenv for MongoDB
dotenv.config();
const app = express();

// Middleware to parse JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '..', 'public')));

// Importing body-parser
const bodyparser = require("body-parser");

// Importing mongoose for MongoDB
const mongoose = require("mongoose");
mongoose
  .connect(process.env.database) // database --> name given in .env file
  .then(() => {
    console.log("Database connected successfully");
  })
  .catch((err) => {
    console.error("Database connection error:", err);
  });

//importing routes
const ownerRoute = require("./routes/ownerRoute");
const tenanatRoute = require("./routes/tenantRoute");

app.get("/", (req, res) => {
  console.log("middleware-1", req.url);
  res.send("home page");
});
app.use("/owner", ownerRoute);
app.use("/tenant", tenanatRoute);

// creating server
const port = process.env.PORT || 1310;

// Creating server
app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
