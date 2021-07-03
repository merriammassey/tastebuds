const { Schema, model } = require('mongoose');

const Restaurant  = require("./Restaurant") ;
const dateFormat = require('../utils/dateFormat');
const User = require ("./User");

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
        }
        
        ,
        invites: [User] ,
        restaurant: [Restaurant]
    },
    {
        toJSON: {
          getters: true
        }
      }
);


const Event = model ('Event', eventSchema);

module.exports = Event; 

