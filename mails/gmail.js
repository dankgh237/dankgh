const nodemailer = require("nodemailer");
const configMail = {
  service: "gmail",
  secure: true,
  auth: {
    user: "codemon.addo@gmail.com",
    pass: "kegupvnvvocteutd",
  },
};
const transporter = nodemailer.createTransport(configMail);

async function SendMail(req, res) {
  const mailData = {
    from: "constantaddo@gmail.com",
    to: "codemon.addo@gmail.com",
    subject: req.body.subject,
    // text: "A text message for our application",
    // html: `<strong>This is a <i style="color:green;">strong </i> span email</strong>`,
    html: req.body.message
  };

  transporter.sendMail(mailData, function (err, response) {
    if (err) return res.json({mail_error:{message: `Email could not be delivered,check your internet connectivity- (${err.message})`,err}});
    console.log({ status: "success", response });
    return res.json({success:{message: "Email successfully delivered",response}});
  });
}

module.exports = {SendMail};
