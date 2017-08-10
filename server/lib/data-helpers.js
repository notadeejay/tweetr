"use strict";

// Simulates the kind of delay we see with network or filesystem operations
const simulateDelay = require("./util/simulate-delay");
const ObjectId = require('mongodb').ObjectId;

// Defines helper functions for saving and getting tweets, using the database `db`
module.exports = function makeDataHelpers(db) {
  return {

    // Saves a tweet to `db`
    saveTweet: function(newTweet, callback) {
      db.collection("tweets").insertOne(newTweet);
       callback(null, true);
    },

    // Get all tweets in `db`, sorted by newest first
    getTweets: function(callback) {
      db.collection("tweets").find().toArray((err, tweets) => {
        callback(err, tweets)
      });
    },

    updateTweets: function (id, callback) {
      // TODO
      // console.log(tweet object found by id);
      let objId = new ObjectId(id);
      let obj = db.collection("tweets").find({"_id": objId});
      obj.toArray((err, tweet) => {
        if (err) {
          console.log(err)
        } else {
          console.log(tweet)
          console.log(tweet[0]._id)

          db.collection("tweets").update({"_id": tweet[0]._id},{$inc: {"likes": 1}});
          callback(null, true)
        }
      });

    }

  };
}
