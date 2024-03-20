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
    setContent(content, type) {
        this.response["Content"] = content;
        this.response["Content-Length"] = content.length;
        this.response["Content-Type"] = type;
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
        const messageType = this.data.split("\r\n").filter(ele => ele.length > 0)[0].split(" ")[0];
        if (urlArray.length === 1 && this.url === '/') {
            return "HTTP/1.1 200 OK\r\n\r\n"
        } else {
            let responseString = `HTTP/1.1 200 OK`;
            if (urlArray[0].toUpperCase() === "ECHO") {
                this.setContent(urlArray.slice(1).join("/"), "text/plain")
                responseString = this.createResponseString(responseString)
                return responseString;
            } else if (urlArray[0].toLowerCase() === "user-agent") {
                this.setContent(this.userAgent, "text/plain")
                responseString = this.createResponseString(responseString)
                return responseString;
            } else if (urlArray[0].toLowerCase() === "files") {
                const fileUtil = new FileReadWrite(this.directory, urlArray.slice(1).join("/"));
                switch (messageType) {
                    case "GET":
                        try {
                            this.setContent(fileUtil.displayContents(), "application/octet-stream")
                            responseString = this.createResponseString(responseString)
                            return responseString;
                        } catch (e) {
                            return "HTTP/1.1 404 Not Found\r\n\r\n";
                        }
                    case "POST":
                        let responseStringPost = `HTTP/1.1 201 OK`;
                        responseStringPost = this.createResponseString(responseStringPost);
                        fileUtil.writeFile(this.response.Content);
                        return responseStringPost;
                }




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
                case "POST":
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
                default:
                    this.response.Content = valueArray.join(" ");
                    console.log(this.response.Content.length)



            }

        }
    }
}

module.exports = {
    Parser
}