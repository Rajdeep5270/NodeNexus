const express = require("express");
const app = express();

const PORT = 8000;
app.set("view engine", "ejs");
app.use(express.urlencoded());

let id = 104;

let allUsers = [
    {
        id: 101,
        name: "Rajdeep",
        email: "rajdeepex5270@gmail.com",
        password: "rajdeep@123",
        phone: 9348938329,
        address: "Rajasthan"
    },
    {
        id: 102,
        name: "Shyam Lal",
        email: "shyamlal@gmail.com",
        password: "shyamlal@123",
        phone: 8765321546,
        address: "Rander"
    },
    {
        id: 103,
        name: "Prince",
        email: "prince102@gmail.com",
        password: "prince@5401",
        phone: 9499565401,
        address: "Surat"
    },
]


app.get("/", (req, res) => {
    res.render('view', {
        name: "Rajdeep",
        isAdmin: false,
        users: allUsers,
    });
})

// this is get method 
// app.get("/adduser", (req, res) => {
//     const user = req.query;

//     user.id = id;

//     id++;

//     allUsers.push(user);

//     res.redirect("/");
// })

// this is post method secure and safe 

app.get("/addUser", (req, res) => {
    res.render("form");
});

app.post("/adduser", (req, res) => {
    const user = req.body;

    user.id = id;
    id++;

    allUsers.push(user);

    res.redirect("/");
});

app.get("/deleteUser", (req, res) => {
    const userId = req.query.id;

    allUsers = allUsers.filter((data) => data.id != userId);

    res.redirect("/");
});

app.get("/editUser", (req, res) => {

    const user = allUsers.find(user => user.id == req.query.id);

    if (!user)
        return res.redirect("/");

    return res.render("edit", {
        user
    });

})

app.post("/updateUser", (req, res) => {
    console.log(req.body);

    allUsers = allUsers.map((user) => {
        if (user.id == req.body.id) {
            return req.body;
        }
        else {
            return user;
        }
    })

    res.redirect("/");
})

app.listen(PORT, (e) => {
    if (e) {
        console.log("Server is not started...");
    }
    console.log("Server is Started...");
});

