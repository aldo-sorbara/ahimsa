var gulp = require('gulp'),
    $ = require('gulp-load-plugins')(),
    replaceName = require('gulp-replace-name'),
    minifyHtml = require("gulp-minify-html"),
    concat = require('gulp-concat'),
    rename = require("gulp-rename"),
    uglify = require('gulp-uglify'),
    cleanCSS = require('gulp-clean-css'),
    autoprefixer = require('gulp-autoprefixer'),
    tap = require('gulp-tap'),
    imagemin = require('gulp-imagemin'),
    removeDiacritics = require('diacritics').remove,
    sort = require('gulp-sort'),
    removeAccents= require('remove-accents'),
    sanitize = require("sanitize-filename"),
    gzip   = require('gulp-gzip');

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
    .pipe(gzip())
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
      .pipe(gzip())
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
    .pipe(replaceName(/\s/g, '_'))
    .pipe(tap(function(file, t) {
            var path = file.path.lastIndexOf('/');
            var module = file.path.substring(path + 1);
            var array = module.split('');
            var newFileName = [];
            array.forEach(function(entry) {
                // console.log('entro aca', entry.charCodeAt(0), entry);
                if (entry.charCodeAt(0) !== 769) {
                  newFileName.push(entry);
                }
              // newFileName.push(removeAccents(removeDiacritics(entry)))
            })
            console.log(newFileName.join(""));
            gulp.src(file.path)
              .pipe(rename(newFileName.join("")))
              .pipe(gulp.dest(imagesDest)); // ./dist/main/text/ciao/goodbye.md
            // console.log(newFileName);
            // var newFileName = removeAccents(removeDiacritics(module));
            // console.log(removeAccents(removeDiacritics('holáááááá aldo.png')));
            // console.log(removeAccents(removeDiacritics(newFileName)));
          }))
});
