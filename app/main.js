const net = require("net");
const { Parser } = require("./parser");

// You can use print statements as follows for debugging, they'll be visible when running tests.
console.log("Logs from your program will appear here!");
let directory = ""
// Uncomment this to pass the first stage
const server = net.createServer((socket) => {

    const args = process.argv.slice(2);
    if(args.length() !== 0){
        if (args.includes("--directory")) {
            const i = args.indexOf("--directory") + 1;
            directory = args[i];
        }
    }

    socket.on("close", () => {
        socket.end();
        server.close();
    });

    socket.on('data', (data) => {
        const parser = new Parser(directory)
        parser.setData(data.toString())
        parser.parseInput()
        socket.write(parser.sendResponse())
        socket.end()
    })

});

server.listen(4221, "localhost");
