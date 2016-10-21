/**
 * [gulp description]
 * 
 */
var gulp = require('gulp'),  
    sass = require('gulp-ruby-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    minifycss = require('gulp-minify-css'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin'),
    rename = require('gulp-rename'),
    clean = require('gulp-clean'),
    concat = require('gulp-concat'),
    notify = require('gulp-notify'),
    cache = require('gulp-cache'),
    livereload = require('gulp-livereload'),
    minifyInline = require('gulp-minify-inline-scripts');

var config = require('./conf/config');

/**
 * [description]
 * @param  {[type]}
 * @return {[type]}   [description]
 */
gulp.task('styles', function() {  
  return gulp.src(
        dev_url + 'css_extend/main.css'
    )
    .pipe(minifycss())
    .pipe(concat('bundle.css'))
    .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
    .pipe(gulp.dest(product_url + 'css'))
    .pipe(notify({ message: 'Styles task complete' }));
});

/**
 * [description]
 * @param  {[type]}
 * @return {[type]}   [description]
 */
gulp.task('scripts', function() {

   
    for (var key in config.devScripts)
    {
        var devScripts = config.devScripts[key],
            gulpDevScripts = [];

        devScripts['scripts'].forEach(function(value, key) {
            gulpDevScripts.push('./public/src/' + value);
        });

        
        //console.log(devScripts['packFileName']);
        gulp.src(
        gulpDevScripts
        )
        .pipe(uglify())
        .pipe(concat(devScripts['packFileName']))
        .pipe(gulp.dest('./public' + devScripts['packPath']))
        .pipe(notify({ message: 'Scripts task ['+ key +'] complete' }));
     

    }


 
});


//gulp.task('inline_scripts', function() {  
// gulp.src('views/**/*.html')
//        .pipe(minifyInline())
//        .pipe(gulp.dest('views_dist'))
//        .pipe(notify({ message: 'inline Scripts task complete' }));
//});