const bcrypt = require("bcrypt");

class Bcrypt{
    static saltRounds = 10;
    static hash = async(requestPassword)=> await bcrypt.hash(requestPassword, this.saltRounds);
    static compare = async(requestPassword, dbHashedPassword) => await bcrypt.compare(requestPassword, dbHashedPassword);
} 

module.exports = Bcrypt

