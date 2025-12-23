const mongoose = require('mongoose');

const movieSchema = mongoose.Schema({
    movie_name: {
        type: String,
        required: true,
    },
    release_year: {
        type: Date,
        required: true,
    },
    movie_image: {
        type: String,
        required: true,
    },
    movie_lang: {
        type: String,
        required: true,
    },
    movie_desc: {
        type: String,
        required: true,
    },
    movie_director: {
        type: String,
        required: true,
    },
    movie_writer: {
        type: String,
        required: true,
    },
    movie_stars: {
        type: String,
        required: true,
    },
});

const movie = mongoose.model("Movie", movieSchema, "Movies");

module.exports = movie;