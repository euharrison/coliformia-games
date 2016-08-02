'use strict';

var gulp = require('gulp');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var minify = require('gulp-minify');
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
      './node_modules/phaser/build/phaser.min.js',
      './assets/js/playState/sequenciador/pool.js',
      './assets/js/playState/sequenciador/sequenciador.js',
      './assets/js/playState/bg/paralaxBg.js',
      './assets/js/playState/bg/bgScroller.js',
      './assets/js/playState/bg/playerRastro.js',
      './assets/js/playState/levelItem/levelItem.js',
      './assets/js/playState/levelItem/bonner.js',
      './assets/js/playState/levelItem/enemy.js',
      './assets/js/playState/levelItem/dudu.js',
      './assets/js/playState/levelItem/sewer.js',
      './assets/js/playState/levelItem/powerups.js',
      './assets/js/playState/player.js',
      './assets/js/gameStates/boot.js',
      './assets/js/gameStates/load.js',
      './assets/js/gameStates/menu.js',
      './assets/js/gameStates/play.js',
      './assets/js/gameStates/revive.js',
      './assets/js/gameStates/gameover.js',
      './assets/js/gameConfigurations.js',
      './assets/js/game.js'
    ])
    .pipe(sourcemaps.init())
    .pipe(concat('coco.js'))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./build/js'))
    .pipe(minify())
    .pipe(gulp.dest('./build/js'));;
});

gulp.task('default', ['sass', 'scripts']);

gulp.task('watch', ['default'], function () {
  gulp.watch('./assets/scss/**/*.scss', ['sass']);
  gulp.watch('./assets/js/**/*.js', ['scripts']);
});
