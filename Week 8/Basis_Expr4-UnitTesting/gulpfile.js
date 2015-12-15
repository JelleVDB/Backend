/*
 * gulpfile.js
 * 
 */

var gulp = require('gulp'),
    mocha = require('gulp-mocha'),
    gulputil = require('gulp-util');

gulp.task('mocha_test_uitvoeren', function () {
    return gulp.src(['tests/mocha/*.js']   , { read: false })
        .pipe(mocha({ reporter: 'list' }))
         .on('error', gulputil.log);
})

gulp.task('watch_mocha', function () {
    gulp.run('mocha_test_uitvoeren');
    gulp.watch(['tests/mocha/*.js', './**/*.js'], ['mocha_test_uitvoeren']);
});


gulp.task('default', ['mocha_test_uitvoeren']);