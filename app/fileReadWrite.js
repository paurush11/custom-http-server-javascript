const fs = require('fs')
const path = require('path')


class FileReadWrite {
    constructor(directoryPath, fileName) {
        this.directoryPath = directoryPath;
        this.fileName = fileName
        this.exists = false
    }
    setDirectoryPath = (path) => {
        this.directoryPath = path
    }
    setFileName = (name) => {
        this.fileName = name
    }
    checkIfFileExists() {
        this.filePath = path.join(this.directoryPath, this.fileName);
        fs.access(this.filePath, fs.constants.F_OK, (err) => {
            if (err) this.exists = false;
            else this.exists = true;
        })
    }
    displayContents() {
        this.checkIfFileExists();
        if (this.exists) {
            fs.readFile(this.filePath, 'utf-8', (data, err) => {
                return data;
            })
        } else {
            return "-1"
        }
    }
}


module.exports = {
    FileReadWrite
}

