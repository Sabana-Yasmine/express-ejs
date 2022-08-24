const nodemailer = require('nodemailer')
const ejs = require("ejs")
const { join } = require("path")

async function mail(mailData){
    let transporter = nodemailer.createTransport({
        service:process.env.SERVICE,
        host:process.env.HOST,
        port:9000,
        secure:false,
        auth:{
            user:process.env.USER,
            pass:process.env.PASS,
        },
    });

    const data = await ejs.renderFile(
        join(__dirname,"../views",mailData.filename),
        mailData,mailData.details);

    let info = await transporter.sendMail({
        from : mailData.from,
        to : mailData.to,
        subject: mailData.subject,
        text : mailData.text,
        html : data,
    });

    console.log("message sent:", info.messageId)
    
}
module.exports = { mailsending: mail,};