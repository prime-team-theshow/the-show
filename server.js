// requires
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var passport = require('./strategies/local.strategy');
var sessionConfig = require('./modules/session.config');
var nodemailer = require('nodemailer');
require('dotenv').config();

var port = process.env.PORT || 6660;

// use body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// use static directory (this might not be accurate, just guessing for now)
app.use(express.static('./public'));

// Passport Session Configuration
app.use(sessionConfig);

// Start up passport sessions
app.use(passport.initialize());
app.use(passport.session());

// route requires
var registrationRouter = require('./routes/registration.router');
var userAuth = require('./routes/authentication.router');
var indexRouter = require('./routes/index.router');
var organizationRouter = require('./routes/organization.router');
var socialMediaRouter = require('./routes/socialmedia.router');
var adminDashRouter = require('./routes/adminDash.router');

// for testing nodeMailer
var nodeMailerRouter = require('./routes/test.nodemailer.router');

// use routes
app.use('/register', registrationRouter);
app.use('/auth', userAuth);
app.use('/org', organizationRouter);
app.use('/socialmedia', socialMediaRouter);
app.use('/adminDash', adminDashRouter);

// for testing nodeMailer
app.use('/mail', nodeMailerRouter);

app.use('/', indexRouter); // this route should be last to catch everything

// server listening
app.listen(port, function() {
    console.log('Server listening on port: ', port);
}); // end listen