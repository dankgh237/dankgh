const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const path = require("path");
const dotenv = require("dotenv");
dotenv.config({path:path.resolve(__dirname, "../.env")});
const genSecret = crypto.randomBytes(32).toString("hex");
const secret = process.env.JWT_SECRET;


class Jwt{
    static async sign(data){ return jwt.sign({data:data}, secret, { expiresIn: 60})};
    static async verify(token){return jwt.verify(token, secret)}
    static async auth(req,res,next){
        const header = req.headers['authorization'];
        

    }
}

module.exports = Jwt;