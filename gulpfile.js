/* eslint prefer-arrow-callback: off */
/* eslint- import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */
const gulp = require('gulp');
const gutil = require('gulp-util');
const buffer = require('vinyl-buffer');
const source = require('vinyl-source-stream');
const babelify = require('babelify');
const babel = require('gulp-babel');
const browserify = require('browserify');
const watchify = require('watchify');
const uglify = require('gulp-uglify');
const sass = require('gulp-sass');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const sourcemaps = require('gulp-sourcemaps');
const concat = require('gulp-concat');
const ext = require('gulp-ext');
const rm = require('gulp-clean');
const indexJS = require('index-js');
const browserSync = require('browser-sync').create();

const projectURL = 'localhost:3000';

const browserifyConfig = {
  entries: 'src/client/browser.js', // see 'production' below
  debug: true,
};

const babelifyOpts = {
  presets: ['@babel/preset-env', '@babel/preset-react'],
};

const dependencies = [
  'axios',
  'crypto-js', // <-- imported from bellman
  'events',
  'jspath',
  'lodash',
  'react',
  'react-dom',
  'react-headroom',
  'react-modal',
  'react-redux',
  'react-responsive',
  'react-share',
  'react-stickynode',
  'redux',
  'redux-thunk',
  'redux-logger',
  'route-recognizer',
  'serialize-js-model',
  'uuid',
];

const vendorStyles = ['src/client/vendor.css'];

const vendorClientJS = [
  'node_modules/jquery/dist/jquery.min.js',
  'node_modules/materialize-css/dist/js/materialize.min.js',
  'sdk/aws-sdk-2.94.0.min.js',
];

global.isProduction = false;

let BASE = 'dist';

var stdTasks = [
  'indices',
  'html',
  'images',
  'server',
  'styles',
  'assets',
  'vendor-styles',
  'vendor-client-js',
  'vendor',
];

gulp.task('default', ['static-pages', 'browserify-watch', 'browser-sync', 'watch']);
gulp.task('build', ['static-pages', 'browserify']);
gulp.task('no-watch', ['production', 'static-pages', 'browserify']);

gulp.task('static-pages', [...stdTasks], function() {
  const staticRender = require('./dist/server/static-render');
  return staticRender();
});

gulp.task('production', function() {
  global.isProduction = true;
  process.env.NODE_ENV = 'production';
  browserifyConfig.entries = 'src/client/browser-prod.js';
});

// set watch tasks for continous build
gulp.task('watch', function() {
  gulp.watch('src/client/index.app.html', ['html']);
  gulp.watch('src/client/images/**/*', ['images']);
  gulp.watch('src/client/assets/**/*', ['assets']);
  gulp.watch('src/server/*.js', ['server']);
  gulp.watch('src/shared/**/*', ['shared']);
  gulp.watch(dependencies, ['vendor']);
  gulp.watch('src/client/css/**/*.scss', ['styles']);
});

// Live reload browser on file changes
gulp.task('browser-sync', ['static-pages'], function() {
  browserSync.init({
    // For more options @link http://www.browsersync.io/docs/options/
    proxy: projectURL,
    // true: automatically open the browser with BrowserSync live server.
    open: true,
    // true: inject CSS changes. false: reload browser on every change.
    injectChanges: true,
    // Use a specific port (instead of the one auto-detected by Browsersync).
    port: 3001,
  });
});

// copy index.html and favicon.ico
gulp.task('html', function() {
  return gulp
    .src(['src/client/index.app.html', 'src/client/favicon.ico'])
    .pipe(gulp.dest(`${BASE}/public`));
});

// copy images
gulp.task('images', function() {
  return gulp.src('src/client/images/**/*').pipe(gulp.dest(`${BASE}/public/images`));
});

// copy other assets
gulp.task('assets', function() {
  return gulp.src('src/client/assets/**/*').pipe(gulp.dest(`${BASE}/public/assets`));
});

// SERVER
gulp.task('server', ['shared', 'shared-components', '_server']);

gulp.task('config', () => {
  return gulp
    .src(['src/config.js'])
    .pipe(babel())
    .pipe(gulp.dest(BASE));
});

gulp.task('shared', ['config'], () => {
  return gulp
    .src(['src/shared/**/*.js'])
    .pipe(babel())
    .pipe(gulp.dest(BASE + '/shared'));
});

const sharedDeps = [
  'shared-components-jsx',
  // 'shared-components-store',
  // 'shared-lib',
];

gulp.task('shared-components', sharedDeps, () => {
  return gulp
    .src('src/client/**/*.js')
    .pipe(babel())
    .pipe(gulp.dest(BASE + '/client'));
});

gulp.task('shared-components-jsx', () => {
  return gulp
    .src('src/client/**/*.jsx')
    .pipe(babel())
    .pipe(ext.replace('jsx'))
    .pipe(gulp.dest(BASE + '/client'));
});

gulp.task('_server', function() {
  return gulp
    .src('src/server/*.js')
    .pipe(babel())
    .pipe(gulp.dest(BASE + '/server'));
});

// compile third-party dependencies
gulp.task('vendor', function() {
  return browserify()
    .require(dependencies)
    .bundle()
    .pipe(source('vendor.bundle.js'))
    .pipe(buffer())
    .pipe(global.isProduction ? uglify() : gutil.noop())
    .pipe(gulp.dest(`${BASE}/public/js`));
});

gulp.task('styles', function() {
  var plugins = [autoprefixer(), cssnano()];
  return gulp
    .src('src/client/css/main.scss')
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss(plugins))
    .pipe(sourcemaps.write('maps'))
    .pipe(gulp.dest(`${BASE}/public/css`))
    .pipe(browserSync.stream({ match: '**/*.css' }));
});

gulp.task('vendor-styles', function() {
  return gulp
    .src(vendorStyles)
    .pipe(concat('vendor.css'))
    .pipe(gulp.dest(`${BASE}/public/css`));
});

gulp.task('vendor-client-js', function() {
  return gulp
    .src(vendorClientJS)
    .pipe(concat('vendor.browser.js'))
    .pipe(gulp.dest(`${BASE}/public/js`));
});

const _rebundle = (bundler, start = Date.now()) =>
  bundler
    .bundle()
    .on('error', function(err) {
      gutil.log(gutil.colors.red(err.toString()));
      browserSync.notify('Browserify Error!');
    })
    .on('end', function() {
      gutil.log(gutil.colors.green('Finished rebundling in', Date.now() - start, 'ms.'));
    })
    .pipe(source('bundle.js'))
    .pipe(buffer())
    // .pipe(global.isProduction ? uglify() : gutil.noop())
    .pipe(sourcemaps.init({ loadMaps: true }))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(`${BASE}/public/js/`));

gulp.task('browserify-watch', function() {
  const bundler = watchify(browserify(browserifyConfig, watchify.args));
  bundler.external(dependencies);
  bundler.transform(babelify, babelifyOpts);
  bundler.on('update', rebundle);

  function rebundle() {
    const start = Date.now();
    return _rebundle(bundler, start);
  }

  return rebundle();
});

gulp.task('browserify', function() {
  const bundler = browserify(browserifyConfig);
  bundler.external(dependencies);
  bundler.transform(babelify, babelifyOpts);
  return _rebundle(bundler);
});

gulp.task('indices', () => {
  var dirs = ['src/client/components'];

  return gulp
    .src(dirs, { base: './' })
    .pipe(indexJS())
    .pipe(gulp.dest('.'));
});

gulp.task('clean', function() {
  return gulp.src(`${BASE}`, { read: false }).pipe(rm({ async: false }));
});
