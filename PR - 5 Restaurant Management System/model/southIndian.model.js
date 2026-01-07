const mongoose = require('mongoose');

const southIndianFoodSchema = mongoose.Schema({
    dish_name: {
        type: String,
        required: true,
    },
    dish_flavour: {
        type: String,
        required: true,
    },
    dish_price: {
        type: Number,
        required: true,
    },
    dish_image: {
        type: String,
        required: true,
    },
    dish_desc: {
        type: String,
        required: true,
    },
})

module.exports = mongoose.model("SouthIndian", southIndianFoodSchema, "SouthIndian");