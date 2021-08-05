const { Schema, model } = require("mongoose");
const restaurantSchema = require("./RestaurantSchema");
//const dateFormat = require("../utils/dateFormat");
//const User = require("./User");
const VoteSchema = require("./VoteSchema");

const eventSchema = new Schema(
  {
    /* _id: {
      type: String,
    }, */
    title: {
      type: String,
    },
    note: {
      type: String,
    },
    restaurants: [restaurantSchema],
    votes: [VoteSchema],
  },

  {
    toJSON: {
      getters: true,
    },
  }
);

//const Event = model("Event", eventSchema);
const Event = model("Event", eventSchema);

module.exports = Event;
