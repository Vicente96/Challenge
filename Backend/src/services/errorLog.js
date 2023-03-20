var fs = require ('fs');

const useLogFile = (status,error,date) =>{
    fs.appendFile('Error_Log.txt',`Status: ${status} , Error message: ${error} , Date: ${date} \n`, function (err){
        if (err) throw err;
        console.log('File updated')
    });
};

module.exports = useLogFile;
