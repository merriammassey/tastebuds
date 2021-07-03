const { Schema, models } = require('mongoose');

const restaurantSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    categories: {
        type: String
    },
    url: {
        type: String
    },
    rating: {
        type: String
    },
    price: {
        type: String
    },
    location: {
        type: String
    },
    phone: {
        type: String
    },
    image: {
        type: String
    }
});




// creating model 
const Restaurant = model('Restaurant', restaurantSchema);

module.export = Restaurant