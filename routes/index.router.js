// base route

// requires
var express = require('express');
var router = express.Router();
var passport = require('passport');
var path = require('path');


// this will likely need to be updated for admin use
// currently it's only setup to work for org users

// login POST
router.post('/',
    passport.authenticate('local', { // local strategy
        // rerouted as a new request to authentication.router.js
        successRedirect: '/auth'
    }) // end auth
); // end login POST


// GET serves index.html
router.get('/', function(req, res) {
    console.log('In base route.');
    // the path may need to be updated
    var indexRoute = (path.resolve('public/index.html'));
    res.sendFile(indexRoute);
}); // end GET

// export
module.exports = router;