const { Schema, model } = require("mongoose");
const restaurantSchema = require("./Restaurant");
const dateFormat = require("../utils/dateFormat");
const User = require("./User");

const eventSchema = new Schema(
  {
    title: {
      type: String,
    },
    notes: {
      type: String,
    },
  },
  {
    toJSON: {
      getters: true,
    },
  }
);

//const Event = model("Event", eventSchema);

module.exports = eventSchema;
