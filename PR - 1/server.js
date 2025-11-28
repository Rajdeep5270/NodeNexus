const http = require("http");

const server = http.createServer((req, res) => {
    res.write("Server is on.\n");
    res.end("Server loader is off.");
});

server.listen(9090, (e) => {
    if (e) {
        console.log("Server is not started.");
        return;
    }

    console.log("Server is started.");
});