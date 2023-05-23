const nodemailer = require('nodemailer');
const { EMAIL_USER, EMAIL_PASS } = process.env;

const sendEmail = async(data) => {
  const email = {...data, from: EMAIL_USER};
  await transport.sendMail(email);
  return true;
}

    const transport = nodemailer.createTransport({
        host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
      user: EMAIL_USER,
      pass: EMAIL_PASS,
  }
    });    

module.exports = sendEmail;

