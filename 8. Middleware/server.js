const express = require("express");
const PORT = 8080;
const app = express();
app.use(express.urlencoded());

app.set("view engine", "ejs");

const middleware = (req, res, next) => {
    const userAge = req.body;
    if (userAge.age < 18) {
        res.render("login");
    }
    else {
        res.render("about");
    }
}


app.get("/", (req, res) => {
    res.render("login");
});

app.use(middleware);

// app.get("/login", (req, res) => {
//     res.render("login");
// })

app.get("/about", (req, res) => {
    res.render("about");
})

app.post("/checkUser", (req, res) => {

    res.render("home");
})

app.listen(PORT, (e) => {
    if (e) {
        console.log("Server is not Started...", e);
        return;
    }

    console.log("Server is Started...");
})