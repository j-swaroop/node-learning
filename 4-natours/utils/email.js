const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
  // create transporter
  const transporter = nodemailer.createTransport({
    host: process.env.SEND_EMAIL_HOST,
    port: process.env.SEND_EMAIL_PORT,
    auth: {
      user: process.env.SEND_EMAIL_USERNAME,
      pass: process.env.SEND_EMAIL_PASSWORD,
    },
  });

  //   Define Email Options
  const mailOptions = {
    from: `Swaroop <swaroop123@yopmail.com>`,
    to: options.email,
    subject: options.subject,
    text: options.message,
  };

  //   send the email
  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
