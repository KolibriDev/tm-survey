'use strict';
var Datastore = require('nedb'),
    db = null,
    q = require('Q');

var insert = function(doc) {
    console.log('inserting document.');
    var result = q.defer();
    db.insert(doc, function(err, newDoc) {
        if (err) {
            result.reject(err);

        } else {
            result.resolve(newDoc);
        }
    });
    return result.promise;
};

var find = function(query) {
    var result = q.defer();
    db.find(query, function(err, newDoc) {
        if (err) {
            result.reject(err);

        } else {
            result.resolve(newDoc);
        }
    });
    return result.promise;
};

var remove = function(query) {
    var result = q.defer();
    db.remove(query, function(err, newDoc) {
        if (err) {
            result.reject(err);

        } else {
            result.resolve(newDoc);
        }
    });
    return result.promise;
};

module.exports = function(dbname) {
    if (dbname) {
        db = new Datastore({
            filename: dbname,
            autoload: true
        });
    } else {
        db = new Datastore();
    }

    return {
        insert: insert,
        find: find,
        dbObject: db,
        remove:remove
    };
};
