/*jshint esversion: 6 */

// requires
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

/**************
// for user auth, not setup yet
const passport = require('./strategies/local.strategy');
const sessionConfig = require('./modules/session.config');
*/

const port = process.env.PORT || 6660;

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
const indexRouter = require('./routes/index.router');

// use routes
app.use('/', indexRouter); // this route should be last to catch everything

// server listening
app.listen(port, () => {
    console.log('Server listening on port: ', port);
}); // end listen