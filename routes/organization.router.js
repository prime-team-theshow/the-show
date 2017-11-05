// requires
var express = require('express');
var router = express.Router();
var pool = require('../modules/pool');

// GET all organizations for org profiles
router.get('/', function (req, res) {
    console.log('In org GET route.');
    pool.connect( function(err, client, done) {
        if (err) {
            console.log('GET org connection error ->', err);
            res.sendStatus(500);
            done();
        } else {
            var queryString = "SELECT * FROM trails";
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
}); // end GET all org


// export
module.exports = router;