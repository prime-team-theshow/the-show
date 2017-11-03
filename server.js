// requires
var express = require('express');
var app = express();
var bodyParser = require('body-parser');

/**************
// for user auth, not setup yet
var passport = require('./strategies/local.strategy');
var sessionConfig = require('./modules/session.config');
*/

var port = process.env.PORT || 6660;

// use body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// use static directory (this might not be accurate, just guessing for now)
app.use(express.static('./public'));

/************** 
// Passport Session Configuration
app.use(sessionConfig);

// Start up passport sessions
app.use(passport.initialize());
app.use(passport.session());
 */

// route requires
var indexRouter = require('./routes/index.router');

// use routes
app.use('/', indexRouter); // this route should be last to catch everything

// server listening
app.listen(port, function() {
    console.log('Server listening on port: ', port);
}); // end listen