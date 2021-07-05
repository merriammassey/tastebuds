const express = require("express");
const router = express.Router();

const mongoose = require("mongoose");
const Vote = require("../models/Vote");
//
const Pusher = require("pusher");

var pusher = new Pusher({
  appId: "1228744",
  key: "3cb02dbd0c542bff3bd5",
  secret: "18a0f8a7e8854f574cc5",
  cluster: "us3",
  useTLS: true,
});

//make request
router.get("/", (req, res) => {
  //fetch and send polls
  Vote.find().then((votes) => res.json({ success: true, votes: votes }));
});

/* Vote.find().then((votes) => {
    res.json({ success: true, votes: votes });
    console.log(votes);
  });
}); */

//when user votes, make request to poll
router.post("/", (req, res) => {
  const newVote = {
    restaurant: req.body.restaurant,
    points: 1,
  };

  new Vote(newVote).save().then((vote) => {
    pusher.trigger("tastebuds", "tastebudsvote", {
      points: parseInt(vote.points),
      //points: 1,
      restaurant: vote.restaurant,
      //restaurant: req.body.restaurant,
    });
    return res.json({ success: true, message: "Thank you for voting!" });
  });
});

module.exports = router;
