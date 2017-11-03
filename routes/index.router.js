// base route

// requires
var express = require('express');
var router = express.Router();
var passport = require('passport');
var path = require('path');

// GET serves index.html
router.get('/', function(req, res) {
    console.log('In base route.');
    // the path may need to be updated
    var indexRoute = (path.resolve('public/index.html'));
    res.sendFile(indexRoute);
}); // end GET

// export
module.exports = router;