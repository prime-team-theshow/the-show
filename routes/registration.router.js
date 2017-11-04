// requires
var express = require('express');
var router = express.Router();
var pool = require('../modules/pool');
var encryptLib = require('../modules/encryption');

router.post('/organization', function(req, res, next) {
    console.log('in register org user post route');

    // variables from client
    var userToSave = {
        username: req.body.username,
        password: encryptLib.encryptPassword(req.body.password)
    }; // end saveUser
    console.log('new org user: ', userToSave);

    pool.connect( function(err, client, done) {
        if (err) {
            console.log('POST connection error ->', err);
            res.sendStatus(500);
            done();
        } else {

            // this will eventually need to use the id of the existing org and then update that record
            // for now it will just create a new row and return the primary key of the new row

            var queryString = "INSERT INTO organization (email, password) VALUES ($1, $2) RETURNING id";
            var values = [userToSave.username, userToSave.password];
            client.query(queryString, values, function(queryErr, result) {
                if (queryErr) {
                    console.log('Query POST connection Error ->', queryErr);
                    res.sendStatus(500);
                } else {
                    res.sendStatus(201);
                } // end else
                done();
            }); // end query
        } // end else
    }); // end pool connect
}); // end post

//export
module.exports = router;