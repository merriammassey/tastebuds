const { Schema, model } = require('mongoose');
// const bcrypt = require('bcrypt');


const ResturantSchema = new Schema ({
    resturantName:
{
    type: String 
}
});

// create the resturant model 

const Resturant = model ('Resturant', ResturantSchema);

module.exports.Pizza; 