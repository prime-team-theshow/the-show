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

var transporter = nodemailer.createTransport({
    service: 'AOL', // built in SMTP connection details - cases sensitive
    auth: {
        user: process.env.EMAIL_UN,
        pass: process.env.EMAIL_PW
    } // end auth
}); // end transporter

var fromAdmin = {
    name: 'The Show Profile Administrator',
    address: process.env.EMAIL_UN
}; // end fromAdmin

// POST route for testing
router.post('/test', function (req, res) {
    console.log('in mailer /test POST');

    // email of organization to invite
    var emailToInvite = req.body.email; // this will need to be setup on client side post route

    // message to be sent to organization
    var message = {
        from: fromAdmin, // admin user email
        to: emailToInvite, // organization who receives the invite
        subject: '', // Subject line
        text: 'node mailer test', // plain text body
        html: '<p>paragraph html test</p>' // html body
    }; // end mailOptions

    // send message using the above information
    transporter.sendMail(message, function (err, info) {
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