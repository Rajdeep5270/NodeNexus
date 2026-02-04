const mongoose = require('mongoose');

const adminSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    hobbies: {
        type: Array,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    about: {
        type: String,
        required: true
    },
    profileImage: {
        type: String,
        required: true
    },
});

module.exports = mongoose.model("Admin", adminSchema, "Admin");