'use strict';
var express = require('express');
var bodyParser = require('body-parser')
var app = express();

var dbHandler = require('./db_handler')('surveys.db');

function serveAngularAppFolder(app) {
    //app.use(express.compress());
    app.use(express.static(__dirname + '/../.tmp'));
    app.use(express.static(__dirname + '/../app'));
    app.use(express.static(__dirname + '/../bower_components'));
};
app.use(bodyParser.urlencoded({
    extended: false
}))

// parse application/json
app.use(bodyParser.json())

//app.use(express.cookieParser());

app.get('/getall', function(req, res) {
    dbHandler.find({}).then(function(doc) {
        console.log(doc[0]);
        res.json(200, doc);
    }).fail(function(err) {
        res.send(500, err);
    });

});

app.get('/getsurvey/:id', function(req, res) {
    dbHandler.find({_id:req.params.id}).then(function(doc) {
        res.json(200, doc[0]);
    }).fail(function(err) {
        res.send(500, err);
    });

});

app.post('/addsurvey', function(req, res) {
    console.log(req.body);
    var doc = dbHandler.insert(req.body);
    res.send(200, doc);
});

serveAngularAppFolder(app);

app.listen(3000);
