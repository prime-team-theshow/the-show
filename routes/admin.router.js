/*
This router handles admin related routes
*/

// requires
var express = require('express');
var router = express.Router();
var pool = require('../modules/pool');

// GET organization that currently do not have an email or password
router.get('/invite', function (req, res) {
    console.log('in invite GET route.');
    var isAdmin = req.user.isadmin;
    // check if user is logged in and is an admin
    if (req.isAuthenticated() && isAdmin) {
        // connect to database
        pool.connect(function (err, client, done) {
            if (err) {
                console.log('admin invite GET connection error ->', err);
                res.sendStatus(500);
                done();
            } else {
                var queryString = "SELECT org.id, org.name, org.email, org.invited " +
                "FROM organization org " +
                "WHERE org.password IS NULL";
                client.query(queryString, function (queryErr, result) {
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
    } else {
        console.log('not logged in');
        res.sendStatus(403);
    } // end else for authentication
}); // end GET organizations to invite

// export
module.exports = router;