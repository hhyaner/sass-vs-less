var gulp = require('gulp');
// https://www.npmjs.com/package/gulp-less
var less = require('gulp-less');
var combiner = require('stream-combiner2');
var sourcemaps = require('gulp-sourcemaps');

var lessWrite = require('less');

lessWrite.render('.class { width: (1 + 1) }', {
        paths: ['.', './lib'], // Specify search paths for @import directives
        filename: 'less/index.less', // Specify a filename, for better error messages
        // compress: true // Minify CSS output
    },
    function(e, output) {
        console.log(output.css);
    });


// Using a less plugin to minify css
var LessPluginCleanCSS = require('less-plugin-clean-css'),
    cleancss = new LessPluginCleanCSS({ advanced: true });

gulp.task('less', function() {
    var combined = combiner.obj([
        gulp.src('./src/less/**/*.less'),
        // .pipe(sourcemaps.init({ loadMaps: true }))
        less({
            // plugins: [cleancss],
            // Array of paths to be used for @import directives
            paths: [__dirname, './est/src'],
            // 使用文档说不支持该选项，但现在支持(之前低版本)。
            // compress: true
        }),
        gulp.dest('./src/styles')
    ]);

    // any errors in the above streams will get caught
    // by this listener, instead of being thrown:
    combined.on('error', console.error.bind(console));

    return combined;

    // 未加错误处理前的代码
    return gulp.src('./src/less/**/*.less')
        // .pipe(sourcemaps.init({ loadMaps: true }))
        .pipe(less({
            // plugins: [cleancss],
            // Array of paths to be used for @import directives
            paths: [__dirname, './est/src'],
            // 使用文档说不支持该选项，但现在支持(之前低版本)。
            // compress: true
        }))
        // .pipe(sourcemaps.write('../maps'))
        .pipe(gulp.dest('./src/styles'))
});
gulp.task('watch', function() {
    gulp.watch('./src/less/**/*.less', ['less']);
})

gulp.task('default', ['less', 'watch']);
