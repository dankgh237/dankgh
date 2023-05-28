const path = require("path");
const fs = require("fs");
const logs = path.resolve(__dirname, "./app.log");
const {log} = require("./log");

const logger = (req,res,next)=>(fs.writeFile(logs,log(req),{flag:"a+"},(err,data)=>err?console.log(err):null),next());
module.exports = logger;


