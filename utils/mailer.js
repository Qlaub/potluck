const nodemailer = require('nodemailer');
require('dotenv').config();

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
  to: 'e.pirazzi@gmail.com',
  subject: 'Test email',
  text: 'test text'
};

transporter.sendMail(mailOptions, (err, success) => {
  if(err) {
    console.log(err);
  } else {
    console.log('Email sent successfully!');
  }
});