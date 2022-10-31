const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
dotenv.config();

const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: process.env.user,
      pass: process.env.pass
    }

})

// transport.sendMail(emailMsg);

module.exports = transport;