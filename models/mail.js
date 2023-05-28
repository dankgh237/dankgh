
require("../database/mongoose");

const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const email = new Schema({
    name: String,
    email: String,
    subject: String,
    message: {type:String},
    date: { type: Date, default: Date.now },
});

const Email = mongoose.model('Email', email);

async function persistData(value){
    return new Email({
        name: value.name,
        email: value.email,
        subject: value.subject,
        message:value.message
    })
}

module.exports = persistData

// console.log(persistData());

// persistData().then(function(data){ data.save()})


