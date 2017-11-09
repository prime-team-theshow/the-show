// requires
var express = require('express');
var router = express.Router();
var pool = require('../modules/pool');

router.get("/year/:year", function (req, res) {
    pool.connect(function (connectionError, client, done) {
        if (connectionError) {
            console.log('GET winners/year/:year pool connect error', connectionError);
        } else {
            var query = "SELECT id FROM ad INNER JOIN year ON ad.year_id=year.id WHERE year.num=$1;";
            var values = [parseInt(req.params.year)];
            client.query(query, values, function (queryError, result) {
                if (queryError) {
                    console.log('GET winners/year/:year query error', queryError);
                    res.sendStatus(500);
                } else {
                    res.send(result.rows);
                }
            })
        }
    });
});

// export
module.exports = router;