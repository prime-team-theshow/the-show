/*
This router handles organization and admin user authentication
*/

// requires
var express = require('express');
var router = express.Router();

// Handles Ajax request for user information if user is authenticated
router.get('/', function (req, res) {
    console.log('in auth GET route');

    // check if user is logged in
    if (req.isAuthenticated()) {
        // send back user object from database
        console.log('User req.user.id, req.user.email, req.user.isadmin ', req.user.id, req.user.email, req.user.isadmin);

        var userInfo = {
            username: req.user.email,
            id: req.user.id,
            isadmin: req.user.isadmin
        }; // end userInfo
        res.send(userInfo);
    } else {
        console.log('not logged in');
        res.send(false);
    } // end else
}); // end auth GET

// clear all server session information about this user
router.get('/logout', function(req, res){
    console.log('in auth logout GET');

    // Use passport's built-in method to log out the user
    console.log('Logged out');
    req.logOut();
    res.sendStatus(200);
}); // end logout GET

// export
module.exports = router;