const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const VoteSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  /* toJSON: {
    getters: true,
  }, */
});

//create collection and add schema
const Votes = mongoose.model("Votes", VoteSchema);

//module.exports = VoteSchema;

module.exports = VoteSchema;
