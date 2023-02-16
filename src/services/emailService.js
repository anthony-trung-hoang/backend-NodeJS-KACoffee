require('dotenv').config();
import nodemailer from 'nodemailer';

let sendEmail = async (email, verificationCode, user_name) => {
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
      from: '"KA Coffee" <mightyxpress2@gmail.com>', // sender address
      to: email, // list of receivers
      subject: "Reset your password", // Subject line
      text: "", // plain text body
      html: `
      <h3>Xin chào, KA Coffee gửi ${user_name} mã khôi phục mật khẩu</h3>
      <div><b>Đừng chia sẻ mã này cho ai: ${verificationCode}</b></div>
      <div><p>From KA Coffee with love <3 </p> </div>
      `,
   });

}

module.exports = {
   sendEmail: sendEmail
}
