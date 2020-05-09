var nodemailer = require('nodemailer');
let mailOptions = {
    from: 'vijaymrs.project@gmail.com',
    to: '',
    subject: '',
    text: "", // plain text body
    html: "" // html body
};
let transporter = nodemailer.createTransport({
    // host: 'smtp.gmail.com',
    // port: 465,
    // secure: true, // use SSL
    // auth: {
    //     user: 'vijaymrs.project@gmail.com',
    //     pass: 'vijay@270980'
    // }

    service: 'gmail',
    auth: {
        user: 'vijaymars.project@gmail.com',
        pass: 'vijay@270980'
    }
});
class EmailClient {

    constructor() { }

    sendEmail(emailType, user) {
        console.log(user);
        debugger;
        mailOptions.from = 'vijaymrs.project@gmail.com';
        switch (emailType) {
            case "CONTACT":
                mailOptions.to = user.eMailID;
                mailOptions.subject = "Contct Inquiry";
                mailOptions.html = `<h1>Welcome ${user.name} </h1>`;
                break;
            case "REGISTER":
                mailOptions.to = user.email;
                mailOptions.subject = "Register Successful";
                mailOptions.html = `<h1>Welcome ${user.name} </h1>`;
                break;
            case "OTP":
                mailOptions.to = user.email;
                mailOptions.subject = "Your OTP ";
                mailOptions.html = `<p>Welcome ${user.email}</p>
            <p>Your OTP is ${user.otp}</p>`;
                break;
        }
        console.log(mailOptions);
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });
    }
     
}
module.exports = EmailClient;



