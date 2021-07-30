const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const VoteSchema = new Schema({
  restaurant: {
    type: String,
    required: true,
  },
  points: {
    type: String,
    required: true,
  },
});

//create collection and add schema
const Vote = mongoose.model("Vote", VoteSchema);

module.exports = Vote;
