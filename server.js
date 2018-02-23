var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var _ = require('underscore');
var app = express();
var http = require("http");
var url = require("url");

var db;

/************************* START App initialization & Middlewares ************************************/
/****************************************************************************************************/

//log requests
// app.use(logger('dev'));

//Parse json
app.use(bodyParser.json({ limit: '15mb' }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'));
app.use(express.static(__dirname + '/uploads'));


//Set headers for CORS
app.all('/*', function(req, res, next) {

    res.header("Access-Control-Allow-Origin", "*"); // restrict it to the required domain
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-type,Accept,X-Access-Token,X-Key,req-hostname');

    if (req.method == 'OPTIONS') {
        res.status(200).end();
    } else {
        next();
    }
});

// app.all('/secure/*', [require('./middlewares/validateRequest')]);

app.use('/', require('./routes'));

// If no route is matched by now, it must be a 404
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    var pathname = url.parse(req.url).pathname;
    console.log("Request for " + pathname + " received.");
    err.status = 404;
    next(err);
});


/************************* Start Server & DB *******************************************************/
/***************************************************************************************************/

//Start server
app.set('port', process.env.PORT || 3000);

var server = app.listen(app.get('port'), function() {
    console.log('Express server listening on port ' + server.address().port);
});


// Database Connection
mongoose.connect("mongodb://localhost:27017/doctorApp", function(err, database) {
    if (err) {
        console.log(err);
        process.exit(1);
    }
    // Save database object from the callback for reuse.
    db = database;
    console.log("Database connection ready");

});
