class Parser {
    constructor(){
        this.commands = {}; 
        this.data = ""; 
    }
    setData(data){
        this.data = data;
    }

    parseInput(){
        let arrayMessage = this.data.split("\r\n");
        console.log(arrayMessage);
    }
}

module.exports = {
    Parser
}