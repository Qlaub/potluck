const nodemailer = require('nodemailer');
require('dotenv').config();

function prepareVerificationEmail(code, link) {
  const email = {
    subject: 'PotLuck Verification Code',
    text: `Thank you for signing-up to PotLuck! Your verification code is ${code}. Click this link to enter the verification code: ${link}`
  };

  return email;
}

async function sendEmail(userEmail, email) {
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASSWORD
    },
    tls: {
      rejectUnauthorized: false
    }
  });
  
  let mailOptions = {
    from: process.env.EMAIL,
    to: userEmail,
    subject: email.subject,
    text: email.text
  };
  
  transporter.sendMail(mailOptions, (err, success) => {
    if(err) {
      console.log(err);
    } else {
      console.log('Email sent successfully!');
    }
  });
}

module.exports = {
  sendEmail,
  prepareVerificationEmail
};