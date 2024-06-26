const fs = require('fs')
const path = require('path')


class FileReadWrite {
    constructor(directoryPath, fileName) {
        this.directoryPath = directoryPath;
        this.fileName = fileName
        this.filePath = path.join(this.directoryPath, this.fileName);
    }

    displayContents() {
        return fs.readFileSync(this.filePath);
    }

    writeFile(data){
        return fs.writeFileSync(this.filePath, data);
    }
}


module.exports = {
    FileReadWrite
}

