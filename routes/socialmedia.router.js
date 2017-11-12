// requires
var express = require('express');
var router = express.Router();
var pool = require('../modules/pool');

// get all social media types
router.get('/types', function (req, res) {
    pool.connect(function (connectionError, client, done) {
        if (connectionError) {
            console.log('GET socialmedial/types pool connect error', connectionError);
        } else {
            var query = "SELECT * FROM social_media_type"
            client.query(query, function (queryError, result) {
                done()
                if (queryError) {
                    console.log('GET socialmedial/types query error', queryError);
                    res.sendStatus(501);
                } else {
                    res.send(result.rows);
                }
            })
        }
    });
});

// add new social media type
/**
 * data:
 * {
 *  name:
 *  logo: 
 * }
 */
router.post('/types',
    // function (req, res, next) {
    //     if (req.isAuthenticated() && req.user.isAdmin) {
    //         next();
    //     }
    //     else {
    //         console.log('socialmedia.router POST /socialmedia/type user not authenticated');
    //         res.sendStatus(401);
    //     }
    // },
    function (req, res) {
        pool.connect(function (connectionError, client, done) {

            var socialMediaType = req.body;

            if (connectionError) {
                console.log('POST /socialmedia/type pool connect error', connectionError);
            } else {

                var query = "INSERT INTO social_media_type (name, logo) VALUES ($1, $2)";
                var values = [socialMediaType.name, socialMediaType.logo]

                client.query(query, values, function (queryError, result) {
                    done()
                    if (queryError) {
                        console.log('POST /socialmedia/type query error', queryError);
                        res.sendStatus(501);
                    } else {
                        res.sendStatus(201);
                    }
                })
            }
        });
    }
);

// delete social media type
router.delete('/types/:id',
// function (req, res, next) {
//     if (req.isAuthenticated()) {
//         next();
//     } else {
//         console.log('socialmedia.router DELETE /socialmedia/types/:id user not authenticated');
//         res.sendStatus(401);
//     }
// }, 
function (req, res) {
    pool.connect(function (connectionError, client, done) {

        var socialMediaTypeId = req.params.id;

        if (connectionError) {
            console.log('DELETE /socialmedia/types/:id pool connect error', connectionError);
        } else {

            var query = 'DELETE FROM social_media_type WHERE id=' + socialMediaTypeId;

            client.query(query, function (queryError, result) {
                done()
                if (queryError) {
                    console.log('DELETE /socialmedia/types/:id query error', queryError);
                    res.sendStatus(501);
                } else {
                    res.sendStatus(200);
                }
            })
        }
    });
});


// add social media
/**
 * data:
 * {
 *  typeId:
 *  orgId:
 *  url:
 * }
 */
router.post('/',
    // function (req, res, next) {
    //     if (req.isAuthenticated()) {
    //         next();
    //     }
    //     else {
    //         console.log('organization.router POST /socialmedia user not authenticated');
    //         res.sendStatus(401);
    //     }
    // },
    function (req, res) {
        pool.connect(function (connectionError, client, done) {

            var socialMedia = req.body;

            if (connectionError) {
                console.log('POST /socialmedia pool connect error', connectionError);
            } else {

                var query = "INSERT INTO social_media (social_media_type_id, organization_id, url) VALUES ($1, $2, $3)";
                var values = [socialMedia.typeId, socialMedia.orgId, socialMedia.url];

                client.query(query, values, function (queryError, result) {
                    done()
                    if (queryError) {
                        console.log('POST /socialmedia query error', queryError);
                        res.sendStatus(501);
                    } else {
                        res.sendStatus(201);
                    }
                })
            }
        });
    });

// delete social media
router.delete('/:id',
// function (req, res, next) {
//     if (req.isAuthenticated()) {
//         next();
//     } else {
//         console.log('organization.router DELETE /socialmedia/:id user not authenticated');
//         res.sendStatus(401);
//     }
// }, 
function (req, res) {
    pool.connect(function (connectionError, client, done) {

        var socialMediaId = req.params.id;

        if (connectionError) {
            console.log('DELETE /socialmedia/:id pool connect error', connectionError);
        } else {

            var query = 'DELETE FROM social_media WHERE id=' + socialMediaId;

            client.query(query, function (queryError, result) {
                done()
                if (queryError) {
                    console.log('DELETE /socialmedia/:id query error', queryError);
                    res.sendStatus(501);
                } else {
                    res.sendStatus(200);
                }
            })
        }
    });
});

// export
module.exports = router;