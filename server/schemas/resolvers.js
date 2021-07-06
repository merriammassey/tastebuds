//Resolvers: Resolvers are simply the functions we connect to each query or
//mutation type definition that perform the CRUD actions that each query or mutation is expected to perform.
const { AuthenticationError } = require("apollo-server-express");
const User = require("../models/User");
const Event = require("../models/EventModel");

const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    // get a single user - me
    me: async (parent, args, context) => {
      if (context.user) {
        const userData = await User.findOne({ _id: context.user._id })
          .select("-__v -password")
          .populate("events");

        return userData;
      }

      throw new AuthenticationError("Not logged in");
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

      // console.log(token);

      return { token, user };
    },
    //Only logged-in users should be able to use this mutation, hence why we check for the existence of context.user first
    addEvent: async (parents, eventData, context) => {
      if (context.user) {
        const event = await Event.create({
          ...eventData,
          username: context.user.username,
        });
        console.log(event);
        const user = await User.findOneAndUpdate(
          { _id: context.user._id },
          //{ $push: { events: eventData } },
          { $push: { events: event } },

          // without the { new: true } flag Mongo would return the original document instead of the updated document.
          { new: true }
        );
        console.log(user);
        return user;
      }
      throw new AuthenticationError("You need to be logged in!");
    },
  },
};

module.exports = resolvers;
