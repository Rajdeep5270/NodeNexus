const http = require("http");
const fs = require("fs");

const server = http.createServer((req, res) => {

    if (req.url === '/favicon.ico')
        return;

    const msg = `New User : ${new Date().toLocaleString()} Page : ${req.url} IP Address : ${res.socket.remoteAddress}\n`
    fs.appendFile('./log.txt', msg, (e) => { });

    let filename = "";

    switch (req.url) {
        case '/':
            filename = "index.html";
            break;

        case '/about':
            filename = "about.html";
            break;

        case '/contact':
            filename = "contact.html"
            break;

        default:
            filename = "404.html"
    }

    // res.write("<h1>Welcome to my server.</h1>");
    // res.end("This is my first server.");

    fs.readFile(filename, (err, result) => {
        res.end(result);
    })
});

server.listen(1200, (e) => {
    if (e) {
        console.log("Server is not started", e);
    }
    console.log("Server is Started");
});