"use strict";

// Basic express setup:

const PORT          =  process.env.PORT || 8080;
const express       = require("express");
const bodyParser    = require("body-parser");
const app           = express();
require('dotenv').config();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

// The in-memory database of tweets. It's a basic object with an array in it.
const MongoClient = require("mongodb").MongoClient;
const MONGODB_URI = process.env.MONGODB_URI;

MongoClient.connect(MONGODB_URI, (err, db) => {
  if (err) {
    console.error(`Failed to connect: ${MONGODB_URI}`);
    throw err;
  }
  console.log(`Connected to mongodb: ${MONGODB_URI}`);

  const DataHelpers = require("./lib/data-helpers.js")(db);
  const tweetsRoutes = require("./routes/tweets")(DataHelpers);


  app.use("/tweets/", tweetsRoutes);

  // db.close();
});

app.listen(PORT, () => {
  console.log("Example app listening on port " + PORT);
});
