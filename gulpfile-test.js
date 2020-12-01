"use strict";

// GULP
var _require = require('gulp'),
    src = _require.src,
    dest = _require.dest,
    watch = _require.watch,
    series = _require.series,
    parallel = _require.parallel; // HTML


var htmlmin = require('gulp-htmlmin'); // SCSS


var sass = require('gulp-sass');

var uglifycss = require('gulp-uglifycss');

var autoprefixer = require('gulp-autoprefixer');

var concat = require('gulp-concat');

sass.compiler = require('node-sass'); // JS

var babel = require('gulp-babel');

var uglify = require('gulp-uglify'); // IMAGE


var image = require('gulp-image'); // INPUT


var dirRoot = './',
    dirSCSS = './css/scss',
    dirCSS = './css',
    dirJS = './js',
    dirImg = './img'; // ============ SCSS/SASS ============

function scss() {
  return src(dirSCSS + '/*.scss').pipe(sass().on('error', sass.logError)).pipe(autoprefixer({
    cascade: false
  })).pipe(dest(dirCSS));
} // ============ CSS ============


function css() {
  return src(dirCSS + '/style.css').pipe(uglifycss({
    "maxLineLen": 80,
    "uglyComments": true
  })).pipe(concat('/style.min.css')).pipe(dest(dirRoot));
} // ============ JS ============


function js() {
  return src(dirJS + '/*.js').pipe(babel({
    presets: ['@babel/env']
  })).pipe(uglify()).pipe(concat('main.min.js')).pipe(dest(dirRoot));
} // ============ HTML ============


function htmlMin() {
  return src(dirRoot + '*.html').pipe(htmlmin({
    collapseWhitespace: true
  })).pipe(dest('./dist'));
} // ============ Image ============


function img() {
  return src(dirImg + '/*').pipe(image()).pipe(dest(dirImg));
} // ============ Watch ============


function wacthing() {
  return watch(dirSCSS + '/*.scss', series(scss, css)), watch(dirJS + '/*.js', series(js));
} // ============ Tasks ============


exports.htmlMin = htmlMin;
exports.scss = scss;
exports.css = css;
exports.js = js;
exports.img = img; // ============ Default ============

exports.default = parallel(htmlMin, scss, css, js, img, wacthing);