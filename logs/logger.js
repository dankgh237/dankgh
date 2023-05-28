const path = require("path");
const fs = require("fs");
const logs = path.resolve(__dirname, "../../../tmp/app.log");
const {log} = require("./log");

console.log(logs);

const logger = (req,res,next)=> (fs.writeFile(logs,log(req),
    {flag:"a+"},(err)=>err?console.log(err):null),next());
module.exports = logger;


