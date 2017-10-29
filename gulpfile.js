// Include gulp
var gulp = require('gulp');

// Requires the gulp-sass plugin
var babel = require('gulp-babel');
var concat = require('gulp-concat');
var cleanCSS = require('gulp-clean-css');
var uglifyJS = require('gulp-uglify');
var nodemon = require('gulp-nodemon');
var cachebust = require('gulp-cache-bust');

var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');

gulp.task('minify-css', function() {
    return gulp.src(['assets/stylesheets/lib/*.css', 'assets/stylesheets/*.css'])
        .pipe(concat('styles.css'))
        .pipe(postcss([ autoprefixer() ]))
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .on('error', swallowError)
        .pipe(gulp.dest('public/dist/css'));
});

gulp.task('minify-js', function() {
    return gulp.src(['assets/javascripts/lib/*.js', 'assets/javascripts/*.js'])
        .pipe(concat('public-scripts.js'))
        .pipe(babel({
            presets: ['es2015']
        }))
        .on('error', swallowError)

        .pipe(uglifyJS())
        .on('error', swallowError)

        .pipe(gulp.dest('public/dist/js'));
});

function swallowError (error) {
    console.log(error.toString());
    this.emit('end');
}

// Gulp watcher
gulp.task('watch-changes', function () {
    gulp.watch([ 'assets/javascripts/**/*.js', 'assets/stylesheets/**/*.css' ], [ 'minify-css', 'minify-js' ] );
});

gulp.task('watch', ['minify-css', 'minify-js', 'watch-changes']);

gulp.task('compile', ['minify-css', 'minify-js']);

gulp.task('cachebust', function() {

    gulp.src('./views/**/*.handlebars')
        .pipe(cachebust({
            type: 'MD5',
            basePath: 'public'
        }))
        .pipe(gulp.dest('./views'));
});

gulp.task('develop', function () {

    gulp.start('compile');

    nodemon({ script: './bin/www',
        ext: 'js css json www handlebars',
        "ignore": ["temp/*", "temp\\*", "tests/*", "tests\\*", "public/dist/*", "public\\dist\\*", "compiled_views/*", "compiled_views\\*"],
        "env": {
            "NODE_ENV": "testing"
        },
        tasks: ['compile'] })
});

gulp.task('production', ['compile', 'cachebust']);
