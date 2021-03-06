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
var nodeMailerRouter = require('./routes/nodemailer.router');
var adminRouter = require('./routes/admin.router');
var winnersRouter = require('./routes/winners.router');
var createRouter = require('./routes/create.router');

// use routes
app.use('/register', registrationRouter);
app.use('/auth', userAuth);
app.use('/org', organizationRouter);
app.use('/socialmedia', socialMediaRouter);
app.use('/adminDash', adminDashRouter);
app.use('/winners', winnersRouter);
app.use('/mail', nodeMailerRouter);
app.use('/admin', adminRouter);
app.use('/create', createRouter);

app.use('/', indexRouter); // this route should be last to catch everything

// server listening
app.listen(port, function () {
    console.log('Server listening on port: ', port);
}); // end listen