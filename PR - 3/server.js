const express = require("express");

const app = express();

const PORT = 8080;

app.set("view engine", "ejs");
app.use(express.urlencoded());
app.use('/css', express.static(__dirname + '/css'));

let usersData = [
    {
        id: 234,
        name: "Rajdeep Singh Shekhawat",
        profileName: "rajdeep5270",
        email: "rajdeepex5270@gmail.com",
        password: "Rajdeep5270ex@"
    },
    {
        id: 578,
        name: "Sagar Chavda",
        profileName: "sagarChavda@",
        email: "sagar9922@gmail.com",
        password: "sagar1234"
    },
    {
        id: 152,
        name: "Rahul Makwana",
        profileName: "rahul@1234",
        email: "rm993322@gmail.com",
        password: "rahul9099"
    },
]

app.get("/", (req, res) => {
    res.render("login");
});

app.post("/addUser", (req, res) => {
    let user = req.body;

    console.log(user);

    res.render("userData", {
        usersData
    });
});

app.post("/loginUser", (req, res) => {
    let { email, password } = req.body;

    let user = usersData.find(user => user.email == email && user.password == password);

    if (!user) {
        return res.redirect("registerPage");
    }

    res.render("userData", { usersData })
});

app.get("/registerPage", (req, res) => {
    res.render("registerPage");
});

app.get("/backUser", (req, res) => {
    res.redirect("/");
});

app.listen(PORT, (e) => {
    if (e) {
        console.log("Server is not started...", e);
        return;
    }

    console.log("Server is Started...");
})