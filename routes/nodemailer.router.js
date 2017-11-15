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
router.post('/invite-test', function (req, res) {
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

// invite an org to add an email and password to their org's row
// save email in email column, but it can be overwritten when 
// org registers
router.put('/invite/:org_id', function (req, res) {
    console.log('in invite org PUT route.');
    var isAdmin = req.user.isadmin;
    // check if user is logged in and is an admin
    if (req.isAuthenticated() && isAdmin) {
        // org id from client
        var orgId = req.params.org_id; // not sure this is needed
        var orgEmail = req.body.email;
        var message = req.body.message;
        var link = req.body.link; // url for registration with route.params (org.id)
        pool.connect(function (err, client, done) {
            if (err) {
                console.log('PUT connection error ->', err);
                res.sendStatus(500);
                done();
            } else {
                var queryString = "UPDATE organization " +
                    "SET invited=true, email=$2 " +
                    "WHERE id=$1";
                var values = [orgId, orgEmail];
                client.query(queryString, values, function (queryErr, result) {
                    if (queryErr) {
                        console.log('Query PUT connection Error ->', queryErr);
                        res.sendStatus(500);
                    } else {
                        // message to be sent to organization
                        var mailOptions = {
                            from: fromAdmin, // admin user email
                            to: orgEmail, // organization who receives the invite
                            subject: "You're invited to The Show!", // Subject line
                            text: 'node mailer test', // plain text body (I don't know where this is going)
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
                    } // end else
                    done();
                }); // end query
            } // end else
        }); // end pool connect
    } else {
        console.log('not logged in');
        res.sendStatus(403);
    } // end else
}); // end invite PUT




// export
module.exports = router;