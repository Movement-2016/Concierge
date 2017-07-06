/* eslint prefer-arrow-callback: off */
/* eslint- import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */
const gulp = require ('gulp');
const gutil = require ('gulp-util');
const buffer = require ('vinyl-buffer');
const source = require ('vinyl-source-stream');
const babelify = require ('babelify');
const babel = require('gulp-babel');
const browserify = require ('browserify');
const watchify = require ('watchify');
const uglify = require ('gulp-uglify');
const gzip = require ('gulp-gzip');
const sass = require ('gulp-sass');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const sourcemaps = require ('gulp-sourcemaps');
const concat = require('gulp-concat');
const ext = require('gulp-ext');
const rm = require('gulp-rm');
const indexJS = require('index-js');

const browserifyConfig =  {
  entries: 'src/client/main/components/AppBrowserModel.js',
  debug: true,
};

const babelifyOpts = {
  presets: [
    'es2015',
    'react'],
  plugins: [
    'transform-class-properties',
    'transform-object-rest-spread'
    ]
};

const dependencies = [
  'es6-promise-polyfill',
  'events',
  'jspath',
  'lodash',
  'node-fetch',
  'react',
  'react-dom',
  'react-headroom',
  'react-redux',
  'react-responsive',
  'react-share',
  'react-stickynode',
  'redux',
  'redux-thunk',
  'route-recognizer',
  'whatwg-fetch',


];

const fonts = [
  'src/client/fonts/**/*',
];

const vendorStyles = [
  'src/client/vendor.css',
];

const vendorClientJS = [
  'node_modules/jquery/dist/jquery.min.js',
  'node_modules/materialize-css/dist/js/materialize.min.js'
];

global.isProduction = false;

let BASE = 'dist';

var stdTasks = [ 'indecies', 'html', 'images', 'server', 'styles', 'fonts', 'vendor-styles', 'vendor-client-js', 'vendor' ];

gulp.task ('default',   [               ...stdTasks, 'browserify-watch', 'watch']);
gulp.task ('no-watch',  [ 'production', ...stdTasks, 'browserify' ]);

gulp.task( 'production', function() {
  global.isProduction = true;
  process.env.NODE_ENV = 'production';
});

// set watch tasks for continous build
gulp.task ('watch', function () {
  gulp.watch ('src/client/index.html', ['html']);
  gulp.watch ('src/client/images/**/*', ['images']);
  gulp.watch ('src/server/*.js', ['server']);
  gulp.watch ('src/shared/**/*', ['shared']);
  gulp.watch (dependencies, ['vendor']);
  gulp.watch('src/client/css/**/*.scss', ['styles']);
  gulp.watch('src/client/fonts/**/*', ['fonts']);
});

// copy index.html and favicon.ico
gulp.task ('html', function () {
  return gulp.src (['src/client/index.html', 'src/client/favicon.ico'])
    .pipe (gulp.dest (`${BASE}/public`));
});

// copy images
gulp.task ('images', function () {
  return gulp.src ('src/client/images/**/*')
    .pipe (gulp.dest (`${BASE}/public/images`));
});

// copy fonts
gulp.task ('fonts', function () {
  return gulp.src (fonts)
    .pipe (gulp.dest (`${BASE}/public/fonts`));
});

// SERVER
gulp.task( 'server', ['shared','shared-components','_server']);

gulp.task('shared', () => {
  return gulp.src ( 'src/shared/**/*.js')
            .pipe (babel())
            .pipe (gulp.dest (BASE + '/shared'));
});

const sharedDeps = [
  'shared-components-jsx',
  // 'shared-components-store',
  // 'shared-lib',
];

gulp.task('shared-components', sharedDeps, () => {
  return gulp.src ( 'src/client/**/*.js')
            .pipe (babel())
            .pipe (gulp.dest (BASE + '/client'));
});

gulp.task('shared-components-jsx',  () => {
  return gulp.src ( 'src/client/**/*.jsx')
            .pipe (babel())
            .pipe ( ext.replace( 'jsx' ) )
            .pipe (gulp.dest (BASE + '/client'));
});

gulp.task ('_server', function () {
  return gulp.src ( 'src/server/*.js')
    .pipe (gulp.dest (BASE + '/server'));
});

// compile third-party dependencies
gulp.task ('vendor', function () {
  return browserify ()
    .require (dependencies)
    .bundle ()
    .pipe (source ('vendor.bundle.js'))
    .pipe (buffer ())
    .pipe( global.isProduction ? uglify({ mangle: true }) : gutil.noop() )
    .pipe (gzip ({ append: true }))
    .pipe (gulp.dest (`${BASE}/public/js`));
});

gulp.task ('styles', function () {
  var processors = [
    autoprefixer,
    cssnano
  ];
  return gulp.src ('src/client/css/main.scss')
    .pipe (sourcemaps.init())
    .pipe (sass().on ('error', sass.logError))
    .pipe (postcss(processors))
    .pipe (sourcemaps.write('maps'))
    .pipe (gulp.dest (`${BASE}/public/css`));
});

gulp.task ('vendor-styles', function () {
 return gulp.src( vendorStyles )
            .pipe(concat('vendor.css'))
            .pipe(gulp.dest(`${BASE}/public/css`));
});

gulp.task ('vendor-client-js', function () {
 return gulp.src( vendorClientJS )
            .pipe(concat('vendor.browser.js'))
            .pipe(gzip({ append:true }))
            .pipe(gulp.dest(`${BASE}/public/js`));
});

const _rebundle = (bundler,start = Date.now()) => bundler.bundle ()
      .on ('error', function (err) {
        gutil.log (gutil.colors.red (err.toString ()));
      })
      .on ('end', function () {
        gutil.log (gutil.colors.green ('Finished rebundling in', (Date.now () - start), 'ms.'));
      })
      .pipe (source ('bundle.js'))
      .pipe (buffer ())
      .pipe( global.isProduction ? uglify({ mangle: true }) : gutil.noop() )
      .pipe (gzip ({ append: true }))
      .pipe (sourcemaps.init ({ loadMaps: true }))
      .pipe (sourcemaps.write ('.'))
      .pipe (gulp.dest (`${BASE}/public/js/`));

gulp.task ('browserify-watch', function () {
  const bundler = watchify (browserify (browserifyConfig, watchify.args));
  bundler.external (dependencies);
  bundler.transform (babelify, babelifyOpts);
  bundler.on ('update', rebundle);

  function rebundle() {
    const start = Date.now ();
    return _rebundle(bundler,start);
  }

  return rebundle ();
});

gulp.task ('browserify', function () {
  const bundler = browserify (browserifyConfig);
  bundler.external (dependencies);
  bundler.transform (babelify, babelifyOpts);
//bundler.on ('update', rebundle);
  return _rebundle (bundler);
});


gulp.task('indecies', () => {

  var dirs = [ 
      'src/client/main/components'
    ];

  return gulp.src(dirs, { base: './' })
          .pipe(indexJS())
          .pipe (gulp.dest ('.'));
});



gulp.task( 'clean', function() {
  return gulp.src( `${BASE}/**/*`, { read: false })
    .pipe( rm({ async: false }) );
});
