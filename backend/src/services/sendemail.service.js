const transporter = require("../config/email/nodemailer.config");

const sendEmail = async ({toemail,html,subject}) => {
    try {
        const response = await transporter.sendMail({
            to: toemail,
            subject: subject,
            html: html
        })
        return response;
    } catch (error) {
        throw new Error(`EMAIL SEND ERROR: ${error.message}`)
    }
}

module.exports = sendEmail;