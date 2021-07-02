const { Schema, model } = require('mongoose');
const resturantSchema = require("./Resturant")
const dateFormat = require('../utils/dateFormat');
const userSchema = require ("./User")
const eventSchema = new Schema (
    {
        eventName: {
            type: String,
            required: 'You need to name your event',
            minlength: 1,
            maxlength: 30
        },
        createAt: {
            type: Date, 
            default: Date.now,
            get: timestamp => dateFormat(timestamp)
        },
        username: {
            type: String, 
            required: true
        },
        invites: [userSchema],
        resturants: [resturantSchema]
    },
    {
        toJSON: {
          getters: true
        }
      }
);

const Event = model ('Event', eventSchema);

module.exports = Events; 

