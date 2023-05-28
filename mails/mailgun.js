const nodemailer = require("nodemailer");
const mg = require("mailgun-nodemailer-transport").default;

let transporter = nodemailer.createTransport(new mg({
    auth: {
      domain: 'https://api.mailgun.net/v3/sandbox615d1a9656744a31821f5766e2aa83df.mailgun.org',
      apiKey: '12f5474e87f0e6d297d655b999bfe6e4-6b161b0a-cef1d65f'
    }
  }));


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