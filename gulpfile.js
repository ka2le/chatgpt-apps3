const gulp = require('gulp');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
const changed = require('gulp-changed');
const replace = require('gulp-replace');
const tap = require('gulp-tap');

const SRC_PATH = 'public/bookmarklets/*.js';
const DEST_PATH = 'public/bookmarklets/min';

gulp.task('minify-js', function () {
    var timestamp = +new Date();
    return gulp.src(SRC_PATH)
        .pipe(tap(function (file) {
            file.contents.toString().startsWith('javascript:') ? file.isBookmarklet = true : file.isBookmarklet = false;
        }))
        .pipe(replace(/console\.log\([^;]*\)[^;]*$/gm, function(match){
            return match.slice(-1) === ')' ? match + ';' : match;
        }))
        .pipe(replace(/\/\*version-number\*\//g, timestamp)) // Add this line
        .pipe(rename({ suffix: '.min' }))
        .pipe(uglify())
        .pipe(tap(function (file) {
            if (file.isBookmarklet) {
                file.contents = Buffer.from('javascript:(function() {' + file.contents.toString() + '})();');
            }
        }))
        .pipe(gulp.dest(DEST_PATH));
});


gulp.task('watch-js', function () {
    gulp.watch(SRC_PATH, gulp.series('minify-js'));
});

gulp.task('default', gulp.series('minify-js', 'watch-js'));

