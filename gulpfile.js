//plugins - add new ones here
var gulp = require('gulp');
// var cleanCss = require('gulp-clean-css');
// var postcss = require('gulp-postcss');
// var sourcemaps = require('gulp-sourcemaps');
// var concat = require('gulp-concat');
var browserSync = require('browser-sync').create();
var imagemin = require('gulp-imagemin');

//html files
gulp.task('html', function() {
  return gulp.src('src/*.html').pipe(gulp.dest('dist'));
});

//javascript files
gulp.task('javascript', function() {
  return gulp.src('./src/js/*.js').pipe(gulp.dest('dist/js/'));
});

//css files
gulp.task('css', function() {
  return gulp
    .src('./src/css/*.css')
    .pipe(gulp.dest('dist/css/'))
    .pipe(browserSync.stream());
});

//images
gulp.task('images', function() {
  return gulp
    .src('./src/images/*')
    .pipe(imagemin())
    .pipe(gulp.dest('dist/images/'));
});

//fonts
gulp.task('fonts', function() {
  return gulp.src('./src/fonts/*').pipe(gulp.dest('dist/fonts/'));
});

//watch and browser sync
gulp.task('watch', function() {
  browserSync.init({
    server: {
      baseDir: 'dist'
    }
  });
  gulp.watch('./src/*.html', ['html']).on('change', browserSync.reload);
  gulp.watch('./src/css/*.css', ['css']);
  gulp.watch('./src/js/*.js', ['javascript']);
  gulp.watch('./src/fonts/*', ['fonts']);
  gulp.watch('./src/images/*', ['images']);
});

//run task -> run 'gulp' in hyper - add new tasks here
gulp.task('default', ['html', 'css', 'javascript', 'fonts', 'images', 'watch']);
