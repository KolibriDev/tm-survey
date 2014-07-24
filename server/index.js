'use strict';
var express = require('express');
var bodyParser = require('body-parser')
var app = express();
var dbs = {}
dbs.surveys = require('./db_handler')('surveys.db');
dbs.answers = require('./db_handler')('answers.db');

function serveAngularAppFolder(app) {
    //app.use(express.compress());
    app.use(express.static(__dirname + '/../.tmp'));
    app.use(express.static(__dirname + '/../app'));
};
app.use(bodyParser.urlencoded({
    extended: false
}))

// parse application/json
app.use(bodyParser.json())

//app.use(express.cookieParser());

app.get('/getall', function(req, res) {
    dbs.surveys.find({}).then(function(doc) {
        res.json(200, doc);
    }).fail(function(err) {
        res.send(500, err);
    });

});

app.get('/getsurvey/:id', function(req, res) {
    dbs.surveys.find({
        _id: req.params.id
    }).then(function(doc) {
        console.log(doc);
        res.json(200, doc[0]);
    }).fail(function(err) {
        res.send(500, err);
    });

});

app.get('/resultsurvey/:id', function(req, res) {
    dbs.answers.find({
        surveyId: req.params.id
    }).then(function(doc) {
        console.log(doc);
        if (doc.length) {
            res.json(200, doc);
        }
        else{
            res.send(404);
        }
    }).fail(function(err) {
        res.send(500, err);
    });

});

app.post('/addsurvey', function(req, res) {
    console.log(req.body);
    var doc = dbs.surveys.insert(req.body);
    res.send(200, doc);
});

app.post('/savesurvey', function(req, res) {
    var survey = {};
    survey.surveyId = req.body._id;
    delete req.body._id;
    survey.answer = req.body;
    console.log(survey);
    var doc = dbs.answers.insert(survey);
    console.log(doc);
    res.send(200, doc);
});

serveAngularAppFolder(app);

app.listen(3000);
