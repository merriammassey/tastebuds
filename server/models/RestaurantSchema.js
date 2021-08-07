const { Schema, model } = require("mongoose");
//const VoteSchema = require("./Vote");
const userSchema = require("./UserSchema");

const restaurantSchema = new Schema(
  {
    id: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    rating: {
      type: String,
    },
    price: {
      type: String,
    },
    location: {
      type: String,
    },
    city: {
      type: String,
    },
    phone: {
      type: String,
    },
    image_url: {
      type: String,
    },
    url: {
      type: String,
    },
    votes: {
      type: [String],
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);

// creating model
//const Restaurant = model("Restaurant", restaurantSchema);

//module.exports = Restaurant;
module.exports = restaurantSchema;
