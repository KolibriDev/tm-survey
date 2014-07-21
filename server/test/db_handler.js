'use strict';
var assert = require('assert'),
    dbHandler = require('../db_handler')();

describe('Database test of db_handler', function() {
    describe('crud', function() {
        it('should insert new document', function(done) {
            dbHandler.insert({
                name: 'test',
                questions: []
            }).then(function(doc) {
                assert.equal(doc.name, 'test');
                done();
            }).fail(done);
        });

        it('find document', function(done) {
            dbHandler.find({
                name: 'test'
            }).then(function(doc) {
            	assert.equal(doc.length,1);
                assert.equal(doc[0].name, 'test');
                done();
            }).fail(done);
        });

        it('Return all documents', function(done) {
            dbHandler.insert({
                name: 'test',
                questions: []
            }).then(function(doc) {
                dbHandler.find({}).then(function (list) {
                	assert.equal(list.length,2);
                	done();
                }).fail(done);
            }).fail(done);
        });

        it('Remove document', function(done) {
            dbHandler.insert({
                name: 'test2',
                questions: []
            }).then(function(doc) {
                dbHandler.remove({_id:doc._id}).then(function () {
                	dbHandler.find({_id:doc._id}).then(function (doc) {
                		assert.equal(doc.length,0);
                		done();
                	}).fail(done);
                }).fail(done);
            }).fail(done);
        });
    });

});
