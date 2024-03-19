class Parser {
    constructor() {
        this.commands = {};
        this.data = "";
    }
    setData(data) {
        this.data = data;
    }

    parseInput() {
        let arrayMessage = this.data.split("\r\n").filter(ele => ele.length > 0);
        for (let i = 0; i < arrayMessage.length; i++) {
            let valueArray = arrayMessage[i].split(" ");
            console.log(valueArray);

        }
        console.log(arrayMessage);
    }
}

module.exports = {
    Parser
}