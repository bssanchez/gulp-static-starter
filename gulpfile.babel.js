'use strict';

const { src, dest, watch, series } = require('gulp'),
  babel = require('gulp-babel'),
  uglify = require('gulp-uglify'),
  rename = require('gulp-rename'),
  postcss = require('gulp-postcss'),
  autoprefixer = require('autoprefixer'),
  sass = require('gulp-sass'),
  gnf = require('gulp-npm-files'),
  sourcemaps = require('gulp-sourcemaps'),
  pug = require('gulp-pug'),
  browserSync = require('browser-sync').create();

/**
 * Transpile ecmascript ES6 to ES5 with babel
 */
const javascript = () => {
  return src('src/js/**/*.js', { sourcemaps: true })
    .pipe(sourcemaps.init())
    .pipe(babel({
      presets: [
        ['@babel/env', {
          modules: false
        }]
      ]
    }))
    .pipe(rename({ extname: '.min.js' }))
    .pipe(uglify().on('error', (e) => console.log(e)))
    .pipe(sourcemaps.write('.'))
    .pipe(dest('build/assets/js'));
}

/**
 * Process scss files to css.min
 */
const scss = () => {
  const plugins = [
    autoprefixer({ overrideBrowserslist: ['last 10 version'] })
  ];

  return src('./src/scss/**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass({ outputStyle: 'expanded' }).on('error', sass.logError))
    .pipe(postcss(plugins))
    .pipe(rename({ extname: '.min.css' }))
    .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
    .pipe(postcss(plugins))
    .pipe(sourcemaps.write('.'))
    .pipe(dest('build/assets/css'))
    .pipe(browserSync.stream());
};

/**
 * Process PUG files to html
 */
const views = () => {
  return src('./src/pug/**/*.pug')
    .pipe(pug({
      doctype: 'html',
      pretty: '  '
    }))
    .pipe(dest('build'));
};

/**
 * Copy production node modules to build
 */
const copynm = () => {
  return src(gnf(null, './package.json'), { base: './' })
    .pipe(dest('build/assets'));
};

/**
 * Watch for all changes in SRC
 */
const live = () => {
  browserSync.init({
    server: {
      baseDir: "./build/"
    },
    port: 2018,
    notify: false
  });

  watch(['scss/**/*.scss'], { cwd: './src/' }, scss);
  watch(['js/**/*.js'], { cwd: './src/' }, javascript);
  watch(['pug/**/*.pug'], { cwd: './src/' }, views);

  const buildWatcher = watch(['build/**/*.html', 'build/assets/**/*.js']);

  buildWatcher.on('all', (stats, file) => {
    console.log(`Reloading server for ${stats} on ${file}`);
    browserSync.stream();
    browserSync.reload();
  });
}

exports.javascript = javascript;
exports.scss = scss;
exports.copynm = copynm;
exports.views = views;

exports.default = series(views, scss, javascript, live);
exports.build = series(copynm, views, scss, javascript);