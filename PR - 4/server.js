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
            console.log("Data founded...");
            res.render("view", { movies });
        })
        .catch(e => {
            console.log("Data not founded...");
        });
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
app.get("/viewAllMoviePage", async (req, res) => {
    const movies = await movie.find();

    res.render("allMovieViewPage", { movies });
})

// edit form page 
app.get("/editMovie/:id", async (req, res) => {
    // console.log(req.params);

    const foundMovie = await movie.findById(req.params.id);

    // console.log(foundMovie);

    res.render("editMovieForm", { foundMovie });
})

// update movie 
app.post("/updateMovie", async (req, res) => {
    // console.log(req.body);

    const updatedMovie = await movie.findByIdAndUpdate(req.body.id, req.body, { new: true });
    console.log(updatedMovie);

    res.redirect("/viewAllMoviePage");
})

// delete a movie logic  
app.get("/deleteMovie/:id", (req, res) => {

    movie.findByIdAndDelete(req.params.id)
        .then(() => {
            console.log("Movie Deleted Successfully...");
        })
        .catch(e => {
            console.log("Movie Deletion Unsuccessful...");
        });

    res.redirect("/viewAllMoviePage");
})

// to start server 
app.listen(PORT, e => {
    if (e)
        console.log("Server is not started...");

    console.log("Server is started...");
})