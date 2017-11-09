// nodemailer route

/*
Documentation
- https://nodemailer.com/
- https://community.nodemailer.com/2-0-0-beta/setup-smtp/well-known-services/
*/

// requires
var express = require('express');
var router = express.Router();
var pool = require('../modules/pool.js');
var nodemailer = require('nodemailer');
require('dotenv').config();

// AOL (didn't work)
// var transporter = nodemailer.createTransport({
//     service: 'AOL', // built in SMTP connection details - cases sensitive
//     auth: {
//         user: process.env.EMAIL_UN,
//         pass: process.env.EMAIL_PW
//     } // end auth
// }); // end transporter

// GMAIL
// (allow less secure apps on gmail) https://support.google.com/accounts/answer/6010255?hl=en
var transporter = nodemailer.createTransport({
    service: 'gmail', // built in SMTP connection details - cases sensitive
    auth: {
        user: process.env.GMAIL_UN,
        pass: process.env.GMAIL_PW
    } // end auth
}); // end transporter

var fromAdmin = {
    name: 'The Show Profile Administrator',
    address: process.env.GMAIL_UN
}; // end fromAdmin

// POST route for testing
router.post('/invite', function (req, res) {
    console.log('in mailer /invite POST');

    // email of organization to invite
    var emailToInvite = req.body.email; // this will need to be setup on client side post route

    // message to be sent to organization
    var mailOptions = {
        from: fromAdmin, // admin user email
        to: emailToInvite, // organization who receives the invite
        subject: "You're invited to The Show!", // Subject line
        text: 'node mailer test', // plain text body
        html: '<p>Please follow this link to create a profile. <br> <a href="google.com">Link Name</a></p>' // html body
    }; // end mailOptions

    // send message using the above information
    transporter.sendMail(mailOptions, function (err, info) {
        if (err) {
            console.log('sendMail error: ', err);
            res.sendStatus(500);
        } else {
            console.log('Message sent: ', info.messageId, info.response);
            res.sendStatus(200);
        } // end else
    }); // end message
}); // end POST test

// export
module.exports = router;