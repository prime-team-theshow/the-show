/*jshint esversion: 6 */

// requires
const express = require('express');
const router = express.Router();
const passport = require('passport');
const path = require('path');

// GET index.html
router.get('/', (req, res) => {
    console.log('In base route.');
    // the path may need to be updated
    const indexRoute = (path.resolve('public/index.html'));
    res.sendFile(indexRoute);
}); // end GET

// export
module.exports = router;