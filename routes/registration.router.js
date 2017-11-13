/*
This router handles organization and admin user registration
*/

// requires
var express = require('express');
var router = express.Router();
var pool = require('../modules/pool');
var encryptLib = require('../modules/encryption');

// post for organization user registration
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
}); // end organization post

// post for admin user registration
router.post('/admin', function (req, res, next) {
    console.log('in register admin user post route');

    // variables from client
    var adminToSave = {
        username: req.body.username,
        password: encryptLib.encryptPassword(req.body.password)
    }; // end saveUser
    console.log('new admin user: ', adminToSave);

    pool.connect(function (err, client, done) {
        if (err) {
            console.log('POST connection error ->', err);
            res.sendStatus(500);
            done();
        } else {

            var queryString = "INSERT INTO admin (email, password) VALUES ($1, $2) RETURNING id";
            var values = [adminToSave.username, adminToSave.password];
            client.query(queryString, values, function (queryErr, result) {
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
}); // end organization post

// get for org object on registration view
router.get('/:orgId', function (req, res) {
    console.log('in org registration GET route.');
    var orgId = req.params.orgId;
    // connect to database
    pool.connect(function (err, client, done) {
        if (err) {
            console.log('admin invite GET connection error ->', err);
            res.sendStatus(500);
            done();
        } else {
            var queryString = "SELECT org.id, org.name, org.claimed, org.invited, org.email, " +
                // if the org has a password set has_password property to true
                "CASE WHEN org.password IS NULL THEN false else true END AS has_password, " +
                "CASE WHEN org.email IS NULL THEN false else true END AS has_email " +
                "FROM organization org " +
                "WHERE org.id=$1";
            var values = [orgId];
            client.query(queryString, values, function (queryErr, result) {
                if (queryErr) {
                    console.log('Query GET connection Error ->', queryErr);
                    res.sendStatus(500);
                } else {
                    res.status(200).send(result);
                } // end else
                done();
            }); // end query
        } // end else
    }); // end pool connect
}); // end GET organizations to invite

// post for organization user registration
router.put('/organization', function (req, res, next) {
    console.log('in register org user post route');

    // variables from client
    var userToSave = {
        username: req.body.username,
        password: encryptLib.encryptPassword(req.body.password)
    }; // end saveUser
    console.log('new org user: ', userToSave);

    pool.connect(function (err, client, done) {
        if (err) {
            console.log('POST connection error ->', err);
            res.sendStatus(500);
            done();
        } else {

            // this will eventually need to use the id of the existing org and then update that record
            // for now it will just create a new row and return the primary key of the new row

            var queryString = "INSERT INTO organization (email, password) VALUES ($1, $2) RETURNING id";
            var values = [userToSave.username, userToSave.password];
            client.query(queryString, values, function (queryErr, result) {
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
}); // end organization post

//export
module.exports = router;