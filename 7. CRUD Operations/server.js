const express = require("express");
const app = express();

const PORT = 8080;
app.set("view engine", "ejs");

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
    {
        id: 104,
        name: "Ujjwal",
        email: "ujjwalkalia@gmail.com",
        password: "ujjwal@kalia",
        phone: 8954623145,
        address: "Vareli"
    },
]

app.get("/", (req, res) => {
    res.render('home', {
        name: "Rajdeep",
        isAdmin: false,
        users: allUsers,
    });

})

app.listen(PORT, (e) => {
    if (e) {
        console.log("Server is not started...");
    }
    console.log("Server is started...");
})