'use strict';
var gulp = require('gulp'),
    less = require('gulp-less'),
    jshint = require('gulp-jshint'),
    clean = require('gulp-clean'),
    //gutil = require('gulp-util'),
    //usemin = require('gulp-usemin'),
    refresh = require('gulp-livereload'),
    autoprefix = require('gulp-autoprefixer'),
    wait = require('gulp-wait'),
    path = require('path'),
    html = 'app/views/**/*.html',
    clientJavascript = 'app/scripts/**/*.js',
    tmpFolder = '.tmp',
    clientGeneratedJavascript = path.join(tmpFolder, 'scripts/**/*.js'),
    lessFile = 'app/styles/main.less',
    lessFiles = 'app/styles/**/*.less';

// JSHint task
gulp.task('lint', function() {
    gulp.src('./app/scripts/*.js')
        .pipe(jshint())
    // You can look into pretty reporters as well, but that's another story
    .pipe(jshint.reporter('default'));
});

gulp.task('styles', function() {
    gulp.src(lessFile)
        .pipe(less())
        .on('error', function(err) {
            console.log(err);
            //if (!noFail) process.exit(12);
        })
        .pipe(autoprefix("last 1 version"))
        .pipe(gulp.dest(path.join(tmpFolder, 'styles')));
});

gulp.task('clean', function() {
    gulp.src(clientGeneratedJavascript, {
        read: false
    }).pipe(clean());
});

gulp.task('default', ['clean', 'styles', 'watch'], function() {});

gulp.task('watch', ['lint'], function() {
    // Watch our scripts
    refresh.listen();
    gulp.watch(['app/scripts/*.js', 'app/scripts/**/*.js'], [
        'lint'
    ]);
    gulp.watch([lessFiles], ['styles']);
    gulp.watch([clientJavascript, clientGeneratedJavascript, html], function(event) {
        refresh.changed();
    });
    gulp.watch('.tmp/**').on('change', function () {
    	refresh.changed();
    });

});
