import { connect } from "@/dbConfig"
import User from "@/models/userModel"
const bcryptjs = require('bcryptjs')
const nodemailer = require('nodemailer')

connect()
export async function sendEmail({ email, emailType, userId }: any) {
  try {
    const hashedToken = await bcryptjs.hash(userId.toString(), 10)
    if (emailType === "VERIFY") {
      await User.findByIdAndUpdate(userId, {
        verifyToken: hashedToken,
        verifyTokenExpiry: Date.now() + 3600000
      })
    } else if (emailType === "RESET") {
      await User.findByIdAndUpdate(userId, {
        forgotPasswordToken: hashedToken,
        forgotPasswordTokenExpiry: Date.now() + 3600000
      })
    }
    const transporter = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: process.env.NODEMAILER_USER,
        pass: process.env.NODEMAILER_PASS
      }
    });
    const mailOptions = {
      from: 'fcoches@gmail.com',
      to: email,
      subject: emailType === "VERIFY" ? "verify your email" : "reset your password",
      html: `<p> Click on 
      <a href="${process.env.DOMAIN}/user/verifyEmail?token=${hashedToken}">this link</a>
      to ${emailType === "VERIFY" ? "verify your email" : "reset your password"} or you can copy & paste this link on your browser:
      <br/>
      ${process.env.DOMAIN}/user/verifyEmail?token=${hashedToken}
      </p>`
    }
    const mailResponse = await transporter.sendMail(mailOptions)
    console.log()
    return mailResponse
  } catch (error: any) {
    throw new Error(error.message)
  }
}
