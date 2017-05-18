var gulp = require('gulp');
var concat = require('gulp-concat');
var annotate = require('gulp-ng-annotate');
var uglify = require('gulp-uglify');
var del = require('del');
var rename = require('gulp-rename');

var config = {
  js: ['./src/angular-img-cropper.js', './src/**/*.js'],
  dist: './dist'
};

gulp.task('scripts-clean', function(done) {
  return del(config.dist + '/*.js');
});

gulp.task('scripts', ['scripts-clean'], function(done) {
  return gulp.src(config.js)
    .pipe(concat('angular-img-cropper.js'))
    .pipe(gulp.dest(config.dist))
    .pipe(annotate())
    .pipe(uglify())
    .pipe(rename({
      extname: '.min.js'
    }))
    .pipe(gulp.dest(config.dist));
});

gulp.task('build', ['scripts']);

gulp.task('watch', ['build'], function(done) {
  gulp.watch(config.js, ['scripts']);
  done();
});

gulp.task('default', ['watch']);