const gulp = require('gulp');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
const changed = require('gulp-changed');
const replace = require('gulp-replace');
const tap = require('gulp-tap');

const SRC_PATH = 'public/bookmarklets/*.js';
const DEST_PATH = 'public/bookmarklets/min';

gulp.task('minify-js', function (done) {
    gulp.src(SRC_PATH)
        .pipe(changed(DEST_PATH))
        .pipe(replace(/console\.log\([^;]*\)[^;]*$/gm, function(match){
            return match.slice(-1) === ')' ? match + ';' : match;
        }))
        .pipe(tap(function (file) {
            console.log(file.contents.toString());
        }))
        .pipe(rename({ suffix: '.min' }))
        .pipe(uglify())
        .pipe(gulp.dest(DEST_PATH))
        .on('end', done);
});

gulp.task('watch-js', function (done) {
    gulp.watch(SRC_PATH, gulp.series('minify-js'));
    done();
});

gulp.task('default', gulp.series('minify-js', 'watch-js'));
