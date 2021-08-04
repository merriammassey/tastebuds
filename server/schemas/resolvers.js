//Resolvers: Resolvers are simply the functions we connect to each query or
//mutation type definition that perform the CRUD actions that each query or mutation is expected to perform.
const { AuthenticationError } = require("apollo-server-express");
const User = require("../models/User");
const Event = require("../models/EventModel");
const Restaurant = require("../models/RestaurantModel");
const Vote = require("../models/Vote");

const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    // get a single user - me
    me: async (parent, args, context) => {
      if (context.user) {
        const userData = await User.findOne({ _id: context.user._id })
          .select("-__v -password")
          .populate("events");
        console.log(userData);
        return userData;
      }

      throw new AuthenticationError("Not logged in");
    },
    event: async (parent, { _id }) => {
      return await Event.findById(_id)
        .populate("restaurants")
        .populate("votes");

      /* const eventData = await Event.findOne({ _id })
        .populate("restaurants")
        .populate("votes");
      console.log(eventData);
      return eventData; */
    },
    restaurant: async (parent, { eventId, _id }) => {
      const event = await Event.findOne({ eventId }).populate("restaurants");
      /* const restaurant = event.restaurants.filter(
        (restaurant) => restaurant._id === restaurantId
      ); */
      //console.log(restaurant); //undefined
      //return { restaurant }; //null
      return event.restaurants._id(_id);
    },
  },
  /* vote: async (parent, { restaurantId }) => {
      const voteData = await Voted.findOne({ restaurantId });
      console.log(voteData);
      return voteData;
    }, */
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
    //trying to create a Restaurant for votes later
    /* addEvent: async (parents, eventData, context) => {
      if (context.user) {
        const restaurants = [];
        for (let i = 0; i < restaurants.length; i++) {
          const restaurant = await Restaurant.create({
            id: restaurants[i].id,
            name: restaurants[i].name,
            rating: restaurants[i].rating,
            price: restaurants[i].price,
            location: restaurants[i].location,
            city: restaurants[i].city,
            phone: restaurants[i].phone,
            image_url: restaurants[i].image_url,
            url: restaurants[i].url,
          }).then(restaurants.push(restaurant[index]));
          console.log(restaurants);
          const event = await Event.create({
            //take the event data provided and the username and create an event
            ...eventData,
            restaurants,
            username: context.user.username,
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
      }
    }, */
    //works
    addEvent: async (parents, eventData, context) => {
      if (context.user) {
        const event = await Event.create({
          //take the event data provided and the username and create an event
          ...eventData,
          username: context.user.username,
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
    addVote: async (parent, { eventId, voteData }, context) => {
      if (context.user) {
        const vote = await Vote.create({
          ...voteData,
          username: context.user.username,
        });
        console.log(vote);

        const event = Event.findOneAndUpdate(
          { _id: eventId },
          { $push: { votes: vote } },
          { new: true }
        );
        console.log(event);
        return event;
      }
      throw new AuthenticationError("You need to be logged in!");
    },
    /*  addVotes: async (parent, { _id, restaurantId }, context) => {
      //const restaurantId = restaurant._id;
      if (context.user) {
        const event = await Event.findOne({ _id });
        const restaurant = event.restaurants.filter(
          (restaurant) => restaurant.id === restaurantId
        );
        const votes = restaurant.votes;
        const updatedEvent = await Event.findOneAndUpdate(
          { _id },
          //{ $set: restaurant.votes },
          { $set: { votes: restaurant.votes } },
          { $addToSet: { votes: context.user.username } }
          //{ new: true }
        )
          .populate("restaurants")
          .populate("votes");
        return updatedEvent;
        console.log(updatedEvent);
      }

      throw new AuthenticationError("You need to be logged in!");
    }, */
  },
};

module.exports = resolvers;
