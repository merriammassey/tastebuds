const { AuthenticationError } = require("apollo-server-express");
const { User, Restaurant } = require("../models");
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    //get a single user - me
    me: async (_, __, context) => {
      if (context.user) {
        const userData = await User.findOne({ _id: context.user._id }).select(
          "-__v -password"
        );
        return userData;
      }
      throw new AuthenticationError("You're not logged in.");
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
      console.log(token);
      return { token, user };
    },

    saveRestaurant: async (parent, restaurantData, context) => {
      console.log(restaurantData);
      console.log(context.user);
      if (context.user) {
        const user = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $push: { restaurantBooks:restaurantData } },
          { new: true }
        );
        return user;
      }
    },

    removeRestaurant: async (parent, { restaurantId }, context) => {
      if (context.user) {
        const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          {
            $pull: {
              savedBooks: {
                bookId: restaurantId,
              },
            },
          },
          { new: true }
        ).populate("savedRestaurants");
        return updatedUser;
      }
      throw new AuthenticationError("You need to be logged in");
    },
  },
};

module.exports = resolvers;
