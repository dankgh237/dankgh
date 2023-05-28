const path = require("path");
const dotenv = require("dotenv");
dotenv.config({path:path.resolve(__dirname, "../.env")});

const nodemailer = require('nodemailer');
const configMail = {
    service: process.env.MG_SERVICE,
    auth:{
        user:process.env.MG_AUTH_USER,
        pass:process.env.MG_AUTH_PASSWORD
    }
};

const transporter = nodemailer.createTransport(configMail);
async function SendMail(value, res) {
const mailData = {
        from:value.email,
        to:"constantaddo@yahoo.com",
        subject:value.subject,
        // text:"A text message for our application",
        html:value.message,
    
    // text: "A text message for our application",
    // html: `<strong>This is a <i style="color:green;">strong </i> span email</strong>`,
    }
    
transporter.sendMail(mailData, function (err, response) {
    if (err) return res.json({mail_error:{message: `Email could not be delivered,check your internet connectivity- (${err.message})`,err}});
    console.log({ status: "success", response });
    return res.json({success:{message: "Email successfully delivered",response}});
  });

};


module.exports = {SendMail};

