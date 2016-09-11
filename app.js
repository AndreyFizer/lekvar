/*global require, process, __dirname*/

var mongoose = require('mongoose');
var db;
var mongoUri;

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

require('./config/' + process.env.NODE_ENV);

mongoUri = "mongodb://"+ process.env.DB_HOST +":"+ process.env.DB_PORT +"/" + process.env.DB_NAME;
mongoose.connect(mongoUri, {
    db     : {native_parser: true},
    server : {poolSize: 5},
    replset: {rs_name: 'rs-023485'},
    user   : process.env.DB_USER,
    pass   : process.env.DB_PASS
});
db = mongoose.connection;

db.on('error', function (err) {
    "use strict";
    
    console.error('>>>>>    Connection Error: ', err);
});

db.once('open', function () {
    "use strict";
    console.log('   :::   Successfully connection to ' + mongoUri + '.');
    
    var port = process.env.PORT || 3030;
    var http = require('http');
    var path = require('path');
    var express = require('express');
    var session = require('express-session');
    var logger = require('morgan');
    var bodyParser = require('body-parser');
    
    require('./models/index');
    
    var sessionSchema = mongoose.Schema({
        _id    : String,
        session: String,
        expires: Date
    }, {
        collection: 'sessions'
    });
    
    var sessions = db.model('sessions', sessionSchema);
    
    var app = express();
    
    var MemoryStore = require('connect-mongo')(session);
    var sessionConfig = {
        url: 'mongodb://admin:12345@ds023485.mlab.com:23485/andrewtest'
    };
    
    app.use(logger('dev'));
    
    app.set('views', path.join(__dirname, 'public', 'pug'));
    app.set('view engine', 'ejs');
    
    app.use(bodyParser.json({strict: false, inflate: false, limit: 1024 * 1024 * 5}));
    app.use(bodyParser.urlencoded({extended: false, limit: 1024 * 1024 * 5}));
    
    app.use(express.static(path.join(__dirname, 'public')));
    
    app.use(session({
        name             : 'Andrey',
        secret           : 'opopaopaopaopaooopaoopa12345678901234567890',
        resave           : false,
        saveUninitialized: false,
        store            : new MemoryStore(sessionConfig)
    }));
    
    require('./routes/index')(app, db);
    
    app.listen(port, function () {
        console.log('   :::   Server start successfully on port ~~ ' + port + ' ~~ in ' + process.env.NODE_ENV + ' version.');
    });
});

module.exports = {
    db: db
};