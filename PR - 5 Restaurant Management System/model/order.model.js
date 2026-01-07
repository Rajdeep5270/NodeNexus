const mongoose = require('mongoose');

const orderFoodSchema = mongoose.Schema({
    dish_name: {
        type: String,
        required: true,
    },
    dish_price: {
        type: Number,
        required: true,
    },
});

module.exports = mongoose.model("Order", orderFoodSchema, "Order");