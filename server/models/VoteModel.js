const { Schema, model } = require("mongoose");

const VoteSchema = new Schema(
  {
    restaurantId: {
      type: {
        type: String,
      },
    },
    points: [String],
  },
  {
    toJSON: {
      getters: true,
    },
  }
);

//create collection and add schema
const Vote = model("Vote", VoteSchema);

module.exports = Vote;
