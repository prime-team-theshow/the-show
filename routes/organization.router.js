// requires
var express = require('express');
var router = express.Router();
var pool = require('../modules/pool');

// GET organization profile with social medias and associated ads
router.get('/:id', function (req, res) {

    var orgId = req.params.id;

    console.log('In org GET route.');
    pool.connect(function (connectionError, client, done) {
        if (connectionError) {
            console.log('GET org connection error ->', connectionError);
            res.sendStatus(500);
        } else {

            var organization;

            var orgQuery = "SELECT * FROM organization org WHERE org.id = $1"
            client.query(orgQuery, [orgId], function (queryErr, orgResult) {

                if (queryErr) {
                    done(); // release pool worker
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

                        if (queryErr) {
                            done(); // release pool worker
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

/**
 * Updates a org profile
 * @data
 * {
 *  name:
 *  description:
 *  website:
 *  logo:
 * }
 */
router.put('/:id', function (req, res, next) {
    if (req.isAuthenticated()) {
        next();
    } else {
        console.log('organization.router PUT /:id user not authenticated');
        res.sendStatus(401);
    }
}, function (req, res) {

    var orgId = req.params.id
    var data = req.body;

    // create the update query
    var updateQuery = 'UPDATE organization SET';

    // if an updated name was sent
    if (data.name) {
        updateQuery += ' name=' + data.name;
    }
    // if an updated description was sent
    if (data.description) {
        updateQuery += ' description=' + data.description;
    }
    // if an updated website was sent
    if (data.website) {
        updateQuery += ' website=' + data.website;
    }
    // if an updated logo was sent
    if (data.logo) {
        updateQuery += ' logo=' + data.logo;
    }

    // org id
    updateQuery += ' WHERE id=' + orgId;

    pool.connect(function (connectionError, client, done) {
        if (connectionError) {
            console.log('PUT org/:id pool connect error', connectionError);
        } else {
            client.query(updateQuery, function (queryError, result) {
                done()
                if (queryError) {
                    console.log('PUT org/:id query error', queryError);
                    res.sendStatus(501);
                } else {
                    res.sendStatus(201);
                }
            })
        }
    });

    // add social media
    router.post('/:orgId/socialmedia', function (req, res, next) {
        if (req.isAuthenticated()) {
            next();
        }
        else {
            console.log('organization.router PUT /:id user not authenticated');
            res.sendStatus(401);
        }
    }, function (req, res) {

    });

    router.delete('/:orgId,socialmedia', function (req, res, next) {
        if (req.isAuthenticated()) {
            next();
        }
        else {
            console.log('organization.router PUT /:id user not authenticated');
            res.sendStatus(401);
        }
    }, function (req, res) {

    });

    // export
    module.exports = router;