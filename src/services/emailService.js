require('dotenv').config();
import nodemailer from 'nodemailer';

let sendEmail = async (email, verificationCode) => {
   let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
         user: process.env.EMAIL_ACC,
         pass: process.env.EMAIL_PASS,
      },
   });

   // send mail with defined transport object
   let info = await transporter.sendMail({
      from: '"KA Coffee👻" <mightyxpress2@gmail.com>', // sender address
      to: email, // list of receivers
      subject: "Reset your password", // Subject line
      text: "", // plain text body
      html: `<h3>KA Coffee gửi bạn mã khôi phục mật khâu, đừng chia sẻ mã này cho ai: ${verificationCode}</h3>
      `, // html body
   });

}

module.exports = {
   sendEmail: sendEmail
}
