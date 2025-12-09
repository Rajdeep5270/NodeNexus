const express = require("express");
const app = express();

const PORT = 8080;
app.set("view engine", "ejs");
app.use(express.urlencoded());

let userTasks = [
    {
        id: 1,
        task: "Learn Javascript",
    },
    {
        id: 2,
        task: "Learn Typescript",
    },
    {
        id: 3,
        task: "Node JS",
    },
]

let id = 4;

app.get("/", (req, res) => {

    res.render("view", {
        userTasks
    });

});

app.get("/addUser", (req, res) => {
    res.render("form");
})

// add task logic 
app.post("/addUser", (req, res) => {
    const user = req.body;

    user.id = id;
    id++;

    userTasks.push(user);

    res.redirect("/");
})

// delete task logic 
app.get("/deleteUser", (req, res) => {
    let taskId = req.query.id;
    // console.log(taskId);

    userTasks = userTasks.filter((user) => user.id != taskId);

    res.redirect("/");
});

// update task logic 
app.get("/editUser", (req, res) => {
    const user = userTasks.find((user) => user.id == req.query.id);

    if (!user) res.redirect("/");

    return res.render("edit", {
        user
    });

});

app.post("/updateUser", (req, res) => {

    console.log(req.body);


    userTasks = userTasks.map((user) => {
        if (user.id == req.body.id)
            return req.body;
        else
            return user;
    })

    res.redirect("/");
})

app.listen(PORT, (e) => {
    if (e)
        return console.log("Server is not started...");

    console.log("Server is Started...");
});