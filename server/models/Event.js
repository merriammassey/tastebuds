const { Schema, model } = require("mongoose");
const Restaurant = require("./Restaurant");
const dateFormat = require("../utils/dateFormat");
const User = require("./User");

const eventSchema = new (
  {
    name: {
      type: String,
      required: "You need to name your event",
      minlength: 1,
      maxlength: 30,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (timestamp) => dateFormat(timestamp),
    },
    username: {
      type: String,
      required: true,
    },
    notes: {
      type: String,
    },
    invites: [User],
    savedRestaurant: [Restaurant],
  },
  {
    toJSON: {
      getters: true,
    },
  }
);

const Event = model("Event", eventSchema);

module.exports = Event;
