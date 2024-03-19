const net = require("net");
const { Parser } = require("./parser");

// You can use print statements as follows for debugging, they'll be visible when running tests.
console.log("Logs from your program will appear here!");

// Uncomment this to pass the first stage
const server = net.createServer((socket) => {
    socket.on("close", () => {
        socket.end();
        server.close();
    });

    socket.on('data', (data) => {
        console.log('Getting data:', data.toString())
        const parser = new Parser()
        parser.setData(data.toString())
        parser.parseInput()
        socket.write("HTTP/1.1 200 OK\r\n\r\n")
        socket.end()
    })

});

server.listen(4221, "localhost");
