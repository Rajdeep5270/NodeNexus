// this is the module for server 
const http = require("http");

// this is the method built in for create server here we have to send 2 params req and res 
const server = http.createServer((req, res) => {
    res.write("server is on.")
    res.end();
})

// here in listen we have to provide local host number 
server.listen(1234, (err) => {
    if (err) {
        console.log("Server not started", err);
        return;
    }
    console.log("Server started successfully...");
})