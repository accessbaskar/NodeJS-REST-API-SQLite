
var http = require('http');
var fs = require('fs');


class FileRead{
    getFileContent(filePath) {
        return fs.readFile(filePath, function (error, pgResp) {
            if (error) {
                return 'Contents you are looking are Not Found';
            } else {      
                console.log(pgResp);
                return pgResp;
            }            
        });        
    }    
}


module.exports = FileRead;