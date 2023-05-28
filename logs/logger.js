const path = require("path");
const fs = require("fs");
const dotenv = require("dotenv");
const resolve =url=>path.resolve(__dirname,url);
dotenv.config({ path: resolve( "../.env") });



const prod_env = process.env.NODE_ENV=== "production";
const logs = prod_env ? resolve("../../../tmp/app.log"):resolve("./app.log");
const {log} = require("./log");
console.log(logs);

const logger = (req,res,next)=> (fs.writeFile(logs,log(req),
    {flag:"a+"},(err)=>err?console.log(err):null),next());
module.exports = logger;


