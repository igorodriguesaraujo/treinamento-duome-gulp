const { src, dest, series, watch} = require('gulp');

const htmlmin              = require('gulp-htmlmin');

const sass                 = require('gulp-sass');
const autoprefixer         = require('gulp-autoprefixer');
const uglifycss            = require('gulp-uglifycss');
 
const concat               = require('gulp-concat');

sass.compiler              = require('node-sass');

const babel                = require('gulp-babel');
const uglify               = require('gulp-uglify');

const image                = require('gulp-image');

function htmlMin() {
    return src('./index.html')
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(dest('dist/'))
}

function scss() {
    return src('./css/scss/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({
        cascade: false,
    }))
    .pipe(dest('./css'))
}

function css() {
    return src('./css/style.css')
    .pipe(uglifycss({
        "maxLineLen": 80,
        "uglyComments": true
    }))
    .pipe(concat('/style.min.css'))
    .pipe(dest('./'))
}

function js() {
    return src('./js/*.js')
    .pipe(babel({
        presets: ['@babel/env']
    }))
    .pipe(concat('main.min.js'))
    .pipe(uglify())
    .pipe(dest('./'))
}

function imageMin() {
    return src('./img/*')
    .pipe(image())
    .pipe(dest('./dist/img/'))
}

function watching() {
    return watch('./css/scss/*.scss', series(scss, css)),
    watch('./js/*.js', series(js))
}

exports.default = series(htmlMin, scss, css, js, watching);