// requires
var express = require('express');
var router = express.Router();
var pool = require('../modules/pool');

// GET all organizations and any social media links they may have for org profiles
router.get('/:id', function (req, res) {

    var orgId = req.params.id;

    console.log('In org GET route.');
    pool.connect(function (err, client, done) {
        if (err) {
            console.log('GET org connection error ->', err);
            res.sendStatus(500);
            done();
        } else {
            // this only works if all the social media fields exist
            // var queryString = "SELECT org.id, org.name, org.description, org.website, org.logo, " +
            //     "sm1.url AS facebook_url, sm2.url AS instagram_url, sm3.url AS linkedin_url " +
            //     "FROM organization org " +
            //     "LEFT JOIN social_media AS sm1 " +
            //     "ON org.id = sm1.organization_id " +
            //     "LEFT JOIN social_media AS sm2 " +
            //     "ON sm1.organization_id = sm2.organization_id " +
            //     "LEFT JOIN social_media AS sm3 " +
            //     "ON sm1.organization_id = sm3.organization_id " +
            //     "WHERE sm1.social_media_type_id = 1 AND sm2.social_media_type_id = 2 AND sm3.social_media_type_id = 3";

            var organization;

            var orgQuery = "SELECT * FROM organization org WHERE org.id = $1"
            client.query(orgQuery, [orgId], function (queryErr, orgResult) {
                done(); // release pool worker

                if (queryErr) {
                    console.log('Organization Query GET connection Error ->', queryErr);
                    res.sendStatus(500);
                } else {
                    console.log('orgResult.rows --> ', orgResult.rows);

                    // store organization object
                    organization = orgResult.rows[0];

                    var socialMediaQuery = "SELECT * FROM social_media sm " +
                        "INNER JOIN social_media_type smt " +
                        "ON sm.social_media_type_id = smt.id " +
                        "WHERE sm.organization_id = $1"
                    client.query(socialMediaQuery, [orgId], function (queryErr, socialMediaResult) {
                        done(); // release pool worker

                        if (queryErr) {
                            console.log('Social Media Query GET connection Error ->', queryErr);
                            res.sendStatus(500);
                        } else {
                            console.log('socialMediaResult.rows -->', socialMediaResult.rows);

                            // append social medias array to organization object
                            organization.social_medias = socialMediaResult.rows;

                            var adsQuery = "SELECT * FROM ad WHERE ad.organization_id = $1";
                            client.query(adsQuery, [orgId], function (queryErr, adResult) {
                                done(); // release pool worker

                                if (queryErr) {
                                    console.log('Ads Query GET connection Error ->', queryErr);
                                    res.sendStatus(500);
                                } else {
                                    console.log('adResult.rows -->', adResult.rows);

                                    // append ads to organization object
                                    organization.ads = adResult.rows;

                                    // send organization object
                                    res.send(organization);
                                } // end else
                            }); // end adsQuery
                        } // end else
                    }); // end socialMediaQuery
                } // end else
            }); // end orgQuery
        } // end else
    }); // end pool connect
}); // end GET all org



// export
module.exports = router;