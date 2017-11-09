/*
This router handles admin related routes
*/

// requires
var express = require('express');
var router = express.Router();
var pool = require('../modules/pool');

// GET organization that currently do not have an email or password
router.get('/invite', function (req, res) {

}); // end GET organizations to invite

// export
module.exports = router;