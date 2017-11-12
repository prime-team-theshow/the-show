// nodemailer route
/*
Documentation
- https://nodemailer.com/
- https://community.nodemailer.com/2-0-0-beta/setup-smtp/well-known-services/

To use this DOT ENV is required 
with GMAIL_UN as the email address of admin 
and GMAIL_PW aw admin email's password

May need to make changes for justin's email
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

    // message to send org
    var message = req.body.message;

    // dynamic link for org profile registration
    var link = req.body.link;

    // message to be sent to organization
    var mailOptions = {
        from: fromAdmin, // admin user email
        to: emailToInvite, // organization who receives the invite
        subject: "You're invited to The Show!", // Subject line
        text: 'node mailer test', // plain text body (I don't know where this is going)
        // the href below will need to be dynamic and use req.params or req.body
        // it can then update the org row with a username and password
        html: '<p>' + message + '<br> <a href="' + link + '">Create a Profile</a></p>'
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