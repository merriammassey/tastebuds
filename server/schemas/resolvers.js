const { AuthenticationError } = require("apollo-server-express");
const User = require("../models/User");
const Event = require("../models/EventModel");
const Restaurant = require("../models/RestaurantModel");
const Vote = require("../models/VoteModel");
const ObjectId = require("mongodb").ObjectId;
const { signToken } = require("../utils/auth");
const mongoose = require("mongoose");
const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        const userData = await User.findOne({ _id: context.user._id })
          .select("-__v -password")
          .populate("events")
          .populate("restaurants")
          .populate("votes")
          .exec();
        //.sort({ createdAt: -1 });

        //userData.events.sort((a, b) => b.createdAt - a.createdAt);
        console.log(userData);
        return userData;
        //return userData.events.sort((a, b) => b.createdAt - a.createdAt);
      }
      throw new AuthenticationError("Not logged in");
    },
    event: async (parent, { _id }) => {
      return await Event.findById(_id)
        //.sort({ createdAt: -1 })
        .populate("restaurants")
        .populate("votes");
    },
    vote: async (parent, { _id }) => {
      return await Vote.findById(_id);
    },
    restaurant: async (parent, { _id }) => {
      return await Restaurant.findById(_id).populate("votes");
    },
  },
  Mutation: {
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);
      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });
      if (!user) {
        throw new AuthenticationError("Incorrect credentials");
      }
      const correctPw = await user.isCorrectPassword(password);
      if (!correctPw) {
        throw new AuthenticationError("Incorrect credentials");
      }
      const token = signToken(user);
      return { token, user };
    },
    addEvent: async (parents, eventData, context) => {
      if (context.user) {
        const event = await Event.create({
          ...eventData,
        });
        console.log(event);
        //update the user by pushing the event to their events array
        const user = await User.findOneAndUpdate(
          //find the user based on the context
          { _id: context.user._id },
          { $push: { events: event } },
          // without the { new: true } flag Mongo would return the original document instead of the updated document.
          { new: true }
        );
        console.log(user);
        return user;
      }
      throw new AuthenticationError("You need to be logged in!");
    },
    addVote: async (parent, { restaurantId, eventId }, context) => {
      console.log(eventId);
      if (context.user) {
        const event = await Event.findById({
          _id: eventId,
        });
        console.log(event);
        const restaurant = event.restaurants.filter((restaurant) => {
          return restaurant._id.toString() === restaurantId;
        });
        const votes = restaurant[0].votes;
        votes.addToSet(context.user.username);
        const updatedEvent = await event.save();
        return updatedEvent;
      }
      throw new AuthenticationError("You need to be logged in!");
    },
    deleteEvent: async (parent, { _id }, context) => {
      if (context.user) {
        const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          {
            $pull: {
              events: {
                _id: _id,
              },
            },
          },
          { new: true }
        ).populate("events");
        console.log(updatedUser);
        return updatedUser;
      }
      throw new AuthenticationError("You need to be logged in");
    },
  },
};

module.exports = resolvers;
