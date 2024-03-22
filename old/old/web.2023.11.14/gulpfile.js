'use strict';

const gulp = require('gulp');
const pugLinter = require('gulp-pug-linter');
const eslint = require('gulp-eslint');
const csso = require('gulp-csso');
const jsinspect = require('gulp-jsinspect');
const less = require('gulp-less');
const i18nextParser = require('i18next-parser');
const del = require('del');
const jeditor = require('gulp-json-editor');
const webpack = require('webpack');
const webpack_stream = require('webpack-stream');
const webpack_config = require('./webpack.config.js');
const sourcemaps = require('gulp-sourcemaps');
const uglify = require('gulp-uglify');
const header = require('gulp-header');


const ENVIRONMENT = process.env.NODE_ENV || 'production';

const paths = {
  server: [
    '.jshintrc', '*.js', 'package.json',
    'routes/**/*.js',
    'routes/**/*.json',
    'lib/**/*.js',
    'lib/**/*.json',
    'models/**/*.js'
  ],
  locales: [
    'locales/**/*.js',
    'locales/**/*.json'
  ],
  webapp: 'public/javascripts-dev/**/*.js',
  clientSide: 'clientSide/**/*.js',
  styles: 'public/stylesheets-dev/**/*.css',
  less: 'public/stylesheets-dev/**/*.less',
  react: [
    'redux/**/*.js',
    'react/**/*.js',
    'react/**/*.jsx'
  ],
  views: 'views/**/*.pug',
  test: [
    'test/**/*.js'
  ],
  scripts: [
    'scripts/**/*.js'
  ],
  externalStyles: [
    'node_modules/@systran/react-components/lib/Modal.css',
    'node_modules/@systran/react-components/lib/AnimatedLoader.css'
  ]
};

const banner = '/* Copyright © 2021 SYSTRAN S.A. All rights reserved. */';

function lintServer() {
  return gulp.src(paths.server, { allowEmpty: true })
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
}

function lintTest() {
  return gulp.src(paths.test)
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
}

function lintScripts() {
  return gulp.src(paths.scripts)
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
}

function compress() {
  return gulp.src(paths.webapp)
    .pipe(sourcemaps.init())
    .pipe(uglify())
    .pipe(header(banner))
    .pipe(sourcemaps.write('../maps'))
    .pipe(gulp.dest('public/javascripts'));
}

function lintReact() {
  return gulp.src(paths.react)
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
}

const fileArray = [];

const myReporter = (errors) => {
  let file;
  let line;
  const reset = '\x1b[0m';
  const Underscore = '\x1b[4m';

  errors.forEach((err) => {
    if(file !== err.filename) {
      console.groupEnd(); //eslint-disable-line
      console.group('%s%s%s', Underscore, err.filename, reset); //eslint-disable-line
      file = err.filename;
      fileArray.push(err.filename);
    }
    line = '%s:%s  error %s\n----------------------------------------------------------------';
    console.log(line, err.line, err.column, err.message); //eslint-disable-line
  });
};

function lintPug() {
  return gulp.src(paths.views)
    .pipe(pugLinter({ reporter: myReporter, failAfterError: false }))
    .on('end', function(){ console.log(fileArray); }); //eslint-disable-line
}

function lintLocales() {
  return gulp.src(paths.locales)
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
}

function lintClientSide() {
  return gulp.src(paths.clientSide)
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
}

function lintCodeDuplication() {
  return gulp.src(paths.server.concat(paths.react), { allowEmpty: true })
    .pipe(jsinspect({
      threshold: 100,
      identifiers: true,
      literals: true,
      noColor: false,
      noDiff: false,
      suppress: 1000,
      failOnMatch: true
    }));
}

function cleanJavascript(cb) {
  del(['public/javascripts'], cb);
}

function cleanMaps(cb) {
  del(['public/maps'], cb);
}

function cleanStylesheets(cb) {
  del(['public/stylesheets'], cb);
}

function webpackTask() {
  return webpack_stream({config: webpack_config, watch: ENVIRONMENT === 'docker'}, webpack)
    .pipe(gulp.dest('public/javascripts/bundles'));
}

function styles() {
  return gulp.src(paths.styles)
    .pipe(csso())
    .pipe(gulp.dest('public/stylesheets'));
}

function lessTask() {
  return gulp.src(paths.less)
    .pipe(less({strictMath: true}))
    .pipe(csso())
    .pipe(gulp.dest('public/stylesheets'));
}

function watch() {
  gulp.watch(paths.styles, ['styles']);
  gulp.watch(paths.less, ['less']);
}

function watchJshint() {
  gulp.watch(paths.styles, ['styles']);
  gulp.watch(paths.less, ['less']);
}

function generateLocales(sources, ns, outputDir) {
  gulp.src(sources)
    .pipe(i18nextParser({
      keySeparator: '+=+=+=+=+', // fake key to prevent the parser from interpreting dots in i18n as key separators
      locales: ['en'],
      namespace: ns,
      namespaceSeparator: ':::',
      output: outputDir,
      keepRemoved: true,
      writeOld: false
    }))
    .pipe(jeditor(function(json){
      for(const key in json){
        if(json.hasOwnProperty(key) && json[key] === ''){
          json[key] = key;
        }
      }
      return json;
    }))
    .pipe(gulp.dest('locales'));
}

function genLocalesTranslation() {
  generateLocales([
    'lib/**',
    'routes/**',
    'views/**'
  ], 'translation', '../locales');
}

function genLocalesClient() {
  generateLocales([
    'public/javascripts-dev/**'
  ], 'client', '../../locales');
}

function externalStyles(){
  return gulp.src(paths.externalStyles)
    .pipe(csso())
    .pipe(gulp.dest('public/stylesheets'));
}

exports.lintServer = lintServer;
exports.lintTest = lintTest;
exports.lintScripts = lintScripts;
exports.lintPug = gulp.series(lintPug);
exports.lintReact = lintReact;
exports.lintLocales = lintLocales;
exports.lintClientSide = lintClientSide;
exports.lintCodeDuplication = lintCodeDuplication;
exports.lint = gulp.series(gulp.parallel(lintServer), gulp.parallel(lintReact, lintClientSide), gulp.parallel(lintLocales, lintTest, lintCodeDuplication, lintPug));

exports.cleanJavascript = cleanJavascript;
exports.cleanMaps = cleanMaps;
exports.cleanStylesheets = cleanStylesheets;
exports.clean = gulp.parallel(cleanJavascript, cleanMaps, cleanStylesheets);

exports.webpack = webpackTask;
exports.compress = compress;
exports.styles = styles;
exports.less = lessTask;
exports.watch = watch;
exports.watchJshint = watchJshint;
exports.externalStyles = externalStyles;

exports.genLocalesTranslation = genLocalesTranslation;
exports.genLocalesClient = genLocalesClient;
exports.genLocales = gulp.parallel(genLocalesTranslation, genLocalesTranslation);

exports.default = gulp.parallel(exports.lint, compress, webpackTask, styles, lessTask, externalStyles);
