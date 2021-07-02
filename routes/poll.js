const express = require("express");
const router = express.Router();

const mongoose = require("mongoose");
const Vote = require("../server/models/Vote");
//
const Pusher = require("pusher");

const pusher = new Pusher({
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

//when user votes, make request to poll
router.post("/", (req, res) => {
  //when user votes, save option in db
  const newVote = {
    restaurant: req.body.restaurant,
    points: 1,
  };

  //save new vote and get data, passing in points and restaurant name
  new Vote(newVote).save().then((vote) => {
    //pusher triggers frontend event to get points and restaurant name
    pusher.trigger("tastebuds", "tastebudsvote", {
      points: parseInt(vote.points),
      restaurant: vote.restaurant,
    });
    return res.json({ success: true, message: "Thank you vor voting!" });
  });
});

module.exports = router;
