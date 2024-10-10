const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: 'a.tuan08101999@gmail.com',
      pass: 'vxiuoanydmcfemlr'
    }
  });

module.exports = { transporter };
