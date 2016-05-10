var gulp = require('gulp');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');

gulp.task('sass', function() {
    return gulp.src('./app/sass/**/*.scss')
        // .pipe(sourcemaps.init())
        .pipe(sass({
            outputStyle: 'nested',
            // sourceComments: true
        }).on('error', sass.logError))
        // .pipe(sourcemaps.write())
        .pipe(gulp.dest('./app/styles'));
});

gulp.task('watch', function() {
    gulp.watch('./app/sass/**/*.scss', ['sass']);
});

gulp.task('default', ['watch', 'sass']);
