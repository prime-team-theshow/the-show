// requires
var express = require('express');
var router = express.Router();
var pool = require('../modules/pool');

// GET all organizations and any social media links they may have for org profiles
router.get('/', function (req, res) {
    console.log('In org GET route.');
    pool.connect( function(err, client, done) {
        if (err) {
            console.log('GET org connection error ->', err);
            res.sendStatus(500);
            done();
        } else {
            // this only works if all the social media fields exist
            var queryString = "SELECT org.id, org.name, org.description, org.website, org.logo, " +
            "sm1.url AS facebook_url, sm2.url AS instagram_url, sm3.url AS linkedin_url " +
            "FROM organization org " +
            "LEFT JOIN social_media AS sm1 " +
            "ON org.id = sm1.organization_id " +
            "LEFT JOIN social_media AS sm2 "+
            "ON sm1.organization_id = sm2.organization_id " +
            "LEFT JOIN social_media AS sm3 " +
            "ON sm1.organization_id = sm3.organization_id " +
            "WHERE sm1.social_media_type_id = 1 AND sm2.social_media_type_id = 2 AND sm3.social_media_type_id = 3";

            var queryExample = "SELECT * FROM organization org " +
            "LEFT JOIN social_media sm ON org.id = sm.organization_id " +
            "LEFT JOIN social_media_type smt ON smt.id = sm.social_media_type_id " +
            "LEFT JOIN ad ON org.id = ad.organization_id " +
            "WHERE org.id = 1";

            client.query(queryExample, function (queryErr, result) {
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