const { FileReadWrite } = require("./fileReadWrite");

class Parser {
    constructor(directory) {
        this.commands = {};
        this.data = "";
        this.url = "/"
        this.type = "HTTP/1.1"
        this.response = {
            "Content-Type": "text/plain",
            "Content-Length": 0,
            "Content": ""
        }
        this.userAgent = ""
        this.directory = directory
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
    setUserAgent(userAgent) {
        this.userAgent = userAgent;
    }

    createResponseString(responseString) {
        responseString += `\r\n`
        responseString += `Content-Type: ${this.response["Content-Type"]}`
        responseString += `\r\n`
        responseString += `Content-Length: ${this.response["Content-Length"]}`
        responseString += `\r\n`
        responseString += `\r\n`
        responseString += `${this.response["Content"]}`
        return responseString;
    }

    sendResponse() {
        const urlArray = this.url.split("/").slice(1);
        if (urlArray.length === 1 && this.url === '/') {
            return "HTTP/1.1 200 OK\r\n\r\n"
        } else {
            let responseString = `HTTP/1.1 200 OK`;
            if (urlArray[0].toUpperCase() === "ECHO") {
                this.response["Content-Length"] = urlArray.slice(1).join("/").length;
                this.response["Content"] = urlArray.slice(1).join("/");
                responseString = this.createResponseString(responseString)
                return responseString;
            } else if (urlArray[0].toLowerCase() === "user-agent") {
                this.response["Content"] = this.userAgent;
                this.response["Content-Length"] = this.userAgent.length;
                responseString = this.createResponseString(responseString)
                return responseString;
            } else if (urlArray[0].toLowerCase() === "files") {
                const fileUtil = new FileReadWrite(this.directory, urlArray.slice(1).join("/"));
                const values = fileUtil.displayContents();
                console.log(values);
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
                    const userAgentReceived = valueArray[1]
                    this.setUserAgent(userAgentReceived)
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