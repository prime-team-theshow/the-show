// require
var Pool = require('pg').Pool;

// the config will likely need to be updated once we have the DB hosted

//Database config
var config = {
    user: process.env.PG_USER || null,
    password: process.env.DATABASE_SECRET || null,
    host: process.env.DATABASE_SERVER || 'localhost', // Server hosting the database
    port: process.env.DATABASE_PORT || 5432,
    database: process.env.DATABASE_NAME || 'the-show',
    max: 25, // max number of clients in the pool
    idleTimeoutMillis: 30000, // how long a client is allowed to remain idle before being closed
};

// construct and export
module.exports = Pool(config);