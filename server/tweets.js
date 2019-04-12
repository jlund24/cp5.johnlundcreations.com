const mongoose = require('mongoose');
const express = require("express");
const router = express.Router();
const auth = require("./auth.js");



const users = require("./users.js");
const User = users.model;

const tweetSchema = new mongoose.Schema({
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User'
    },
    text: String,
    created: {
      type: Date,
      default: Date.now
    },
  });
  
const Tweet = mongoose.model('Tweet', tweetSchema);


router.post("/", auth.verifyToken, User.verify, async (req, res) => {
    // check parameters
    console.log(req.body);
    const tweet = new Tweet({
      user: req.user,
      text: req.body.text,
      
    });
    try {
      await tweet.save();
      return res.sendStatus(200);
    } catch (error) {
      console.log(error);
      return res.sendStatus(500);
    }
  });


router.get("/", auth.verifyToken, User.verify, async (req, res) => {
    
    try {
      let tweets = await Tweet.find({
        user: req.user
      }).sort({
        created: -1
      });
      return res.send(tweets);
    } catch (error) {
      console.log(error);
      return res.sendStatus(500);
    }
  });


router.get("/all", async (req, res) => {
    try {
      let tweets = await Tweet.find().sort({
        created: -1
      }).populate('user');
      return res.send(tweets);
    } catch (error) {
      console.log(error);
      return res.sendStatus(500);
    }
  });

//   router.get("/:id", async (req, res) => {
//     try {
//         let photo = await Photo.findOne({_id: req.params.id}).populate('user');
//         return res.send(photo);
//     } catch (error) {
//         console.log(error);
//         return res.sendStatus(500);
//     }
//   });

  module.exports = {
    model: Tweet,
    routes: router,
  }

