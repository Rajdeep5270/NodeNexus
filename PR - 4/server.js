const express = require("express");
const PORT = 8080;
require('./config/db.config');
const movie = require('./model/movie.model');

const app = express();

app.set("view engine", "ejs");
app.use(express.urlencoded());
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
        })
})

app.get("/addMovie", (req, res) => {
    res.render("addMovieForm");
})

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

})

// to start server 
app.listen(PORT, e => {
    if (e)
        console.log("Server is not started...");

    console.log("Server is started...");
})