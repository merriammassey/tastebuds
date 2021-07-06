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
    /* 
    users: async () => {
      return User.find().select(" -password").populate("event");
    },
    user: async (parent, { username }) => {
      return User.findOne({ username })
        .select("-__v -password")
        .populate("events");
    },
    events: async (parent, { username }) => {
      const params = username ? { username } : {};
      return Event.find(params).sort({ createdAt: -1 });
    },
    event: async (parent, { _id }) => {
      return Event.findOne({ _id });
    },*/
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
    addEvent: async (parent, eventData) => {
      const event = await Event.create(eventData);
      return event;
    },

    // 21.2.6 end of page might need to revisit this
    addVote: async (parent, { restaurantId, restaurantName }, context) => {
      if (context.user) {
        const updatedEvent = await Event.findOneAndUpdate(
          { _id: eventId },
          {
            $push: {
              vote: { restaurantName, username: context.user.username },
            },
          },
          { new: true, runValidators: true }
        );

        return updatedEvent;
      }
      throw new AuthenticationError("You need to be logged in!");
    },

    //   removeRestaurant: async (parent, { restaurantId }, context) => {
    //     if (context.user) {
    //       const updatedUser = await User.findOneAndUpdate(
    //         { _id: context.user._id },
    //         {
    //           $pull: {
    //             savedRestaurant: {
    //               bookId: restaurantId,
    //             },
    //           },
    //         },
    //         { new: true }
    //       ).populate("savedRestaurant");
    //       return updatedUser;
    //     }
    //     throw new AuthenticationError("You need to be logged in");
    //   },
  },
};

module.exports = resolvers;

/* addEvent: async (parents, args, context) => {
  if (context.user) {
    const event = await Event.create({
      ...args,
      username: context.user.username,
    });

    await User.findByIdAndUpdate(
      { _id: context.user._id },
      { $push: { events: event._id } },
      // without the { new: true } flag Mongo would return the original document instead of the updated document.
      { new: true }
    );
    return event;
  }
  throw new AuthenticationError("You need to be logged in!");
}, */

/*    addRestaurant: async (parent, { thoughtId, restaurantName }, context) => {
      if (context.user) {
        const updatedEvent = await Event.findOneAndUpdate(
          { _id: eventId },
          // Mongo $push to update an existing event
          {
            $push: {
              restaurant: { restaurantName, username: context.user.username },
            },
          },
          { new: true, runValidators: true }
        );

        return updatedEvent;
      }

      throw new AuthenticationError("You need to be logged in!");
    }, */
