const nodemailer = require('nodemailer')

const dotenv = require('dotenv')
dotenv.config()

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
})

exports.sendOtpEmail = async(email, otp, type) => {
    try {
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'your otp code',
            text: `your otp code is:${otp}`
        }
        await transporter.sendMail(mailOptions);
        console.log(`otp email is send to ${email} for ${type}`);
    } catch (error) {
        console.error(`otp email is send to ${email} for ${type}`, error);

    }
}