var nodemailer = require("nodemailer");
//-----------------------------------------------------------------------------
export async function sendMail(
  subject: string,
  toEmail: string,
  message: string,
) {
  var transporter = nodemailer.createTransport({
    service: "gmail",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.MAILER_USER,
      pass: process.env.MAILER_PASS,
    },
    tls: {
      ciphers: "SSLv3",
    },
  });

  var mailOptions = {
    from: process.env.NODEMAILER_EMAIL,
    to: toEmail,
    subject: subject,
    text: message,
  };

  transporter.sendMail(mailOptions, function (error: string, info: string) {
    if (error) {
      throw new Error(error);
    } else {
      console.log("Email Sent");
      return true;
    }
  });
}
