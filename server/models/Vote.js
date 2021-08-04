const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const VoteSchema = new Schema({
  restaurantID: {
    type: String,
    required: true,
  },
  points: [String],
});

//create collection and add schema
const Vote = mongoose.model("Vote", VoteSchema);

module.exports = VoteSchema;
