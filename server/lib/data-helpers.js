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


  likeTweets: function(id, increment, callback) {
      try {
        let amount = increment ? 1 : -1;
        const _id = new ObjectId(id);
        db
          .collection("tweets")
          .findOneAndUpdate({"_id": _id}, {"$inc": {"likes" : amount}}, {returnNew: true}, function(err, tweet) {
           callback(err, tweet)
          });
      } catch(error) {
        callback(error);
      }
    },

  };
}
