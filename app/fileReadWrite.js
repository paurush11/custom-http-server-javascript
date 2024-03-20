const fs = require('fs')
const path = require('path')


class FileReadWrite {
    constructor(directoryPath, fileName) {
        this.directoryPath = directoryPath;
        this.fileName = fileName
        this.exists = false
        this.filePath = path.join(this.directoryPath, this.fileName);
    }
    async checkIfFileExists() {  
        try {
            await fs.access(this.filePath, fs.constants.F_OK);
            this.exists = true;
            console.log('File exists.');
        } catch (err) {
            this.exists = false;
            console.log('File does not exist.');
        }
    }
    async displayContents() {
        await this.checkIfFileExists();
        console.log(this.exists);
        return fs.readFileSync(this.filePath);

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

