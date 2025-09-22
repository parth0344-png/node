const mailer = require("nodemailer")

const mailSend = async (to, subject, text) => {


    const transport = mailer.createTransport({
        service: "gmail",
        auth: {
            user: "patelparth0344@gmail.com",
            pass: "neqe codf gbqk frfr"
        }
    })
    const mailOptions = {
        from: "patelparth0344@gmail.com",
        to: to,
        subject: subject,
        html: `<h1>${text}</h1>`,
        attachments: [
            {
                filename: "myimage.JPG",       
                path: "myimage.JPG",          
             }
        ]
    }

    const mailResponse = await transport.sendMail(mailOptions)
    console.log(mailResponse)


}

// mailSend("patelparth0344@gmail.com","TEST MAIL","welcome to portal")

module.exports = mailSend