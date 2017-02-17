var gulp = require('gulp'),
    minifyHtml = require("gulp-minify-html"),
    concat = require('gulp-concat'),
    rename = require("gulp-rename"),
    uglify = require('gulp-uglify'),
    cleanCSS = require('gulp-clean-css'),
    autoprefixer = require('gulp-autoprefixer'),
    imagemin = require('gulp-imagemin');
    sort = require('gulp-sort');

var jsFiles = 'js/*.js',
    jQuery = 'js/jquery.js',
    jsDest = 'dist/js',
    cssFiles = 'css/*.css',
    cssDest = 'dist/css',
    htmlFiles = './*.html',
    htmlDest = 'dist',
    imagesFiles = 'images/*.+(png|jpg|jpeg|gif|svg)',
    imagesDest = 'dist/images';

gulp.task('scripts', function() {
  gulp.src([jQuery , jsFiles])
    .pipe(concat('scripts.js'))
    .pipe(gulp.dest(jsDest))
    .pipe(rename('scripts.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest(jsDest));
});

gulp.task('css', function() {
  return gulp.src(cssFiles)
      .pipe(cleanCSS())
      .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
      .pipe(concat('style.min.css'))
      .pipe(gulp.dest(cssDest));
})

gulp.task('html', function() {
    gulp.src(htmlFiles) // path to your files
      .pipe(minifyHtml())
      .pipe(gulp.dest(htmlDest));
});

gulp.task('images', function() {
  return gulp.src(imagesFiles)
    .pipe(imagemin())
    .pipe(gulp.dest(imagesDest));
});
