const express = require("express");
const router = express.Router();

//
const Pusher = require("pusher");

const pusher = new Pusher({
  appId: "1228744",
  key: "3cb02dbd0c542bff3bd5",
  secret: "18a0f8a7e8854f574cc5",
  cluster: "us3",
  useTLS: true,
});

//
router.get("/", (req, res) => {
  //fetch and send polls
  res.send("POLL");
});

//when user votes, make request to poll
router.post("/", (req, res) => {
  //pusher triggers frontend event to get points and restaurant name
  pusher.trigger("tastebuds", "tastebudvote", {
    points: 1,
    restaurant: req.body.restaurant,
  });
  return res.json({ success: true, message: "Thank you vor voting!" });
});

module.exports = router;
