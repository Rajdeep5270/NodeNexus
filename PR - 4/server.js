const express = require("express");
const PORT = 8080;
require('./config/db.config');
const movie = require('./model/movie.model');

const app = express();

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname));

// rendered view page for first time website load 
app.get("/", (req, res) => {
    movie.find()
        .then((movies) => {
            const foundMovie = movies.find(movie => movie.id == req.query.id);
            // for debugging 
            // console.log(foundMovie);
            console.log("Data founded...");
            res.render("view", { movies, foundMovie });
        })
        .catch(e => {
            console.log("Data not founded...");
        })
})

// add movie form rendering
app.get("/addMovie", (req, res) => {
    res.render("addMovieForm");
});

// movie data adding process 
app.post("/addMovie", (req, res) => {
    // console.log(req.body);

    movie.create(req.body)
        .then((movies) => {
            console.log("Movie added successfully...");
            // console.log(movies);
            res.redirect("/");
        })
        .catch(e => {
            console.log("Movie not added...");
        });

});

// all movies view page 
app.get("/viewAllMoviePage", (req, res) => {
    movie.find()
        .then((movies) => {
            console.log("All Data of View Page Found...");
            res.render("allMovieViewPage", { movies });
        })
        .catch(e => {
            console.log("All Data of View Page not Found...", e);
        });
})

// to start server 
app.listen(PORT, e => {
    if (e)
        console.log("Server is not started...");

    console.log("Server is started...");
})