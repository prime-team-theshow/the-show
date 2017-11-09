// base route

// requires
var express = require('express');
var router = express.Router();
var passport = require('passport');
var path = require('path');

// login POST - for admin and org users
router.post('/',
    passport.authenticate('local', { // local strategy
        // if user is located in DB
        // reroute as a new request to authentication.router.js (passport.use)
        successRedirect: '/auth'
    }) // end auth
); // end login POST


// GET - serves index.html
router.get('/', function(req, res) {
    console.log('In base route.');
    // the path may need to be updated
    var indexRoute = (path.resolve('public/index.html'));
    res.sendFile(indexRoute);
}); // end GET

// export
module.exports = router;