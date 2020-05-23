var nodemailer = require('nodemailer');


// var FileReader = require('../FileRead')
// let fileReader = new FileReader();
// const htmlOTP = fileReader.getFileContent('../../config/email-templates/otp');
// const htmlRegister = fileReader.getFileContent('../../config/email-templates/register');
// const htmlContact = fileReader.getFileContent('../../config/email-templates/contact');

let mailOptions = {
    from: 'worldtamiltrustorg@gmail.com',
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
        user: 'worldtamiltrustorg@gmail.com',
        pass: 'Tamil@123'
    }
});
class EmailClient {

    constructor() { }

    sendEmail(emailType, user) {

        switch (emailType) {
            case "CONTACT":
                mailOptions.to = user.eMailID;
                mailOptions.subject = "Contct Inquiry";
                mailOptions.html = `<p>Welcome ${user.name}</p>
                <p>Thank you for contacting us</p>
                <p>Your Inquiry</p>
                <table>
                    <tr>
                        <td>
                            Email id
                        </td>
                        <td>
                            ${user.eMailID}
                        </td>
                    </tr>
                    <tr>
                        <td>
                            Mobile number
                        </td>
                        <td>
                            ${user.mobileNo}
                        </td>
                    </tr>
                    <tr>
                        <td>
                            Inquiry details
                        </td>
                        <td>
                            ${user.details}
                        </td>
                    </tr>
                </table>
                <p>Regards,<br />Admin.<br />World Tamil Trust</p>
                `;
                break;
            case "DONATE":
                mailOptions.to = user.eMailID;
                mailOptions.subject = `Thank you ${user.name}`;
                mailOptions.html = `<p>Thank you for sending $.${user.amount}</p>
                <p>Your transaction details</p>
                <table>
                <tr>
                        <td>
                            Email id
                        </td>
                        <td>
                            ${user.eMailID}
                        </td>
                    </tr>
                    <tr>
                        <td>
                            Email id
                        </td>
                        <td>
                            ${user.eMailID}
                        </td>
                    </tr>
                    <tr>
                        <td>
                            Mobile number
                        </td>
                        <td>
                            ${user.mobileNo}
                        </td>
                    </tr>
                    <tr>
                        <td>
                            Amount
                        </td>
                        <td>
                            ${user.amount}
                        </td>
                    </tr>
                </table>
                <p>Regards,<br />Admin.<br />World Tamil Trust</p>
                `;
                break;
            case "REGISTER":
                mailOptions.to = user.email;
                mailOptions.subject = "Register Successfully";
                mailOptions.html = `<p>Welcome ${user.name}</p>
                <p>Thank you for registering with us</p>
                <table>
                <tr>
                        <td>Email id
                        </td>
                        <td>
                            ${user.email}
                        </td>
                    </tr>
                    <tr>
                        <td>Username
                        </td>
                        <td>
                            ${user.name}
                        </td>
                    </tr>
                    <tr>
                        <td>Password
                        </td>
                        <td>
                            ${user.pwd}
                        </td>
                    </tr>
                </table>
                <p>Regards,<br />Admin.<br />World Tamil Trust</p>
                `;
                break;
            case "OTP":
                mailOptions.to = user.email;
                mailOptions.subject = "Your OTP ";
                mailOptions.html = `
                <p>Dear ${user.name},</p>
                <p>Use this OTP <strong>${user.otp}</strong> for your login to World Tamil Trust.</p>
                <p>Regards,<br />Admin.<br />World Tamil Trust</p>`
                break;
        }

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







