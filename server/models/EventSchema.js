const { Schema, model } = require("mongoose");
const restaurantSchema = require("./RestaurantSchema");
const dateFormat = require("../utils/dateFormat");
const User = require("./User");
const Vote = require("./VoteSchema");

const eventSchema = new Schema(
  {
    /* _id: {
      type: String,
    }, */
    title: {
      type: String,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (timestamp) => dateFormat(timestamp),
    },
    note: {
      type: String,
    },
    restaurants: [restaurantSchema],
  },
  {
    toJSON: {
      getters: true,
    },
  }
);

//const Event = model("Event", eventSchema);

module.exports = eventSchema;
