// requires
var express = require('express');
var router = express.Router();
var pool = require('../modules/pool');

// GET all ads for a given year
router.get("/year/:year", function (req, res) {
    pool.connect(function (connectionError, client, done) {
        if (connectionError) {
            console.log('GET winners/year/:year pool connect error', connectionError);
        } else {
            var year = {};

            var yearQuery = "SELECT * FROM year WHERE year.num = $1;";
            var yearValues = [parseInt(req.params.year)];
            client.query(yearQuery, yearValues, function (yearQueryError, yearResult) {
                if (yearQueryError) {
                    done();
                    console.log('GET winners/year/:year year query error', yearQueryError);
                    res.sendStatus(500);
                } else {

                    // store year
                    year = yearResult.rows[0];

                    // query for ads with matching year id
                    var adsQuery = "SELECT ad.id, category.full_category AS category, organization.name AS organization, ad.name, ad.award FROM ad " +
                        "INNER JOIN category ON ad.category_id = category.id " +
                        "INNER JOIN organization ON ad.organization_id = organization.id " +
                        "WHERE ad.year_id = $1;"
                    var adsValues = [year.id];
                    client.query(adsQuery, adsValues, function (adsQueryError, adsResult) {
                        done();
                        if (adsQueryError) {
                            console.log('GET winners/year/:year ads query error', adsQueryError);
                            res.sendStatus(500);
                        } else {
                            // stores ads in year
                            year.ads = adsResult.rows;
                            res.send(year);
                        } // end ads query erro if/else
                    }); // end ads query
                } // end yearQueryError if/else
            }); // year query
        } // end pool connection error if/else
    }); // end pool connection
}); // end GET winners/year/:year

// GET ad details for a given ad id
router.get("/:id", function (req, res) {
    pool.connect(function (connectionError, client, done) {
        if (connectionError) {
            console.log('GET winners/year/:year pool connect error', connectionError);
        } else {
            var adQuery = "SELECT ad.id, category.full_category AS category, organization.name AS organization, ad.name, ad.award, ad.advertiser FROM ad " +
                "INNER JOIN category ON ad.category_id = category.id " +
                "INNER JOIN organization ON ad.organization_id = organization.id " +
                "WHERE ad.id = $1;"
            var adValues = [req.params.id];
            client.query(adQuery, adValues, function (adQueryError, adResult) {
                var ad = {};
                if (adQueryError) {
                    done();
                    console.log('GET winners/:id ad query error', adQueryError);
                    res.sendStatus(500);
                } else {
                    // store ad info
                    ad = adResult.rows[0];

                    var mediasQuery = "SELECT media.id, media.url, media.type FROM media WHERE media.ad_id = $1;";
                    var mediasValues = [ad.id];
                    client.query(mediasQuery, mediasValues, function (mediasQueryError, mediasResult) {
                        if (mediasQueryError) {
                            done();
                            console.log('GET winners/:id medias query error', mediasQueryError);
                            res.sendStatus(500);
                        } else {
                            // store related medias
                            ad.medias = mediasResult.rows;

                            var creditsQuery = "SELECT credit.title, credit.name FROM credit WHERE credit.ad_id = $1;";
                            var creditsValues = [ad.id];
                            client.query(creditsQuery, creditsValues, function (creditsQueryError, creditsResult) {
                                done();
                                if (creditsQueryError) {
                                    console.log('GET winners/:id credits query error', creditsQueryError);
                                    res.sendStatus(500);
                                } else {
                                    // store related credits
                                    ad.credits = creditsResult.rows;
                                    res.send(ad);
                                } // end credits query error if/else
                            }); // end credits query
                        } // end medias query error if/else
                    }); // end medias query
                } // ad query error if/else
            }); // ad query

        } // end pool connection error if/else
    }); // end pool connection
}); // end GET winners/:id

// export
module.exports = router;