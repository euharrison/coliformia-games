'use strict';
 
var gulp = require('gulp');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
 
gulp.task('sass', function () {
  gulp.src('./assets/scss/**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./build/css'));
});

gulp.task('scripts', function() {
  return gulp.src([
      './node_modules/phaser/dist/phaser.js',
      './assets/js/boot.js',
      './assets/js/load.js',
      './assets/js/menu.js',
      './assets/js/play.js',
      './assets/js/gameover.js',
      './assets/js/game.js',
    ])
    .pipe(sourcemaps.init())
    .pipe(concat('script.js'))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./build/js'));
});

gulp.task('default', ['sass', 'scripts']);
 
gulp.task('watch', ['default'], function () {
  gulp.watch('./assets/scss/**/*.scss', ['sass']);
  gulp.watch('./assets/js/**/*.js', ['scripts']);
});