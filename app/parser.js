class Parser {
    constructor() {
        this.commands = {};
        this.data = "";
        this.url = "/"
        this.type = "HTTP/1.1"
        this.response = {
            "Content-Type": "text/plain",
            "Content-Length": 0,
            "Content": ""
        }
    }
    setData(data) {
        this.data = data;
    }
    setUrl(url) {
        this.url = url;
    }

    setHttpType(type) {
        this.type = type;
    }

    sendResponse() {
        const urlArray = this.url.split("/").slice(1);
        if (urlArray.length === 1 && this.url === '/') {
            return "HTTP/1.1 200 OK\r\n\r\n"
        } else {
            if (urlArray[0].toUpperCase() === "ECHO") {
                this.response["Content-Length"] = urlArray.slice(1).join("/").length;
                this.response["Content"] = urlArray.slice(2).join("/");
                console.log(  this.response["Content-Length"])
                console.log(  this.response["Content"])
                let responseString = `HTTP/1.1 200 OK`;
                responseString += `\r\n`
                responseString += `Content-Type: ${this.response["Content-Type"]}`
                responseString += `\r\n`
                responseString += `Content-Length: ${this.response["Content-Length"]}`
                responseString += `\r\n`
                responseString += `\r\n`
                responseString += `${this.response["Content"]}`
                console.log(responseString);
                return responseString;
            }
            return "HTTP/1.1 404 OK\r\n\r\n"
        }
    }

    parseInput() {
        let arrayMessage = this.data.split("\r\n").filter(ele => ele.length > 0);
        for (let i = 0; i < arrayMessage.length; i++) {
            let valueArray = arrayMessage[i].split(" ");
            switch (valueArray[0]) {
                case "GET":
                    const urlReceived = valueArray[1]
                    const httpTypeReceived = valueArray[2];
                    this.setUrl(urlReceived)
                    this.setHttpType(httpTypeReceived)
                    break;
                case "Host:":
                    break;
                case "User-Agent:":
                    break;
                case "Accept-Encoding:":
                    break;
            }

        }
    }
}

module.exports = {
    Parser
}