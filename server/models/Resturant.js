const { Schema, model } = require('mongoose');

const resturantSchema = new Schema({
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
const Resturant = model('Resturant', resturantSchema);

module.export = Resturant