/* eslint prefer-arrow-callback: off */
/* eslint- import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */
const gulp = require ('gulp');
const gutil = require ('gulp-util');
const sass = require ('gulp-sass');
const buffer = require ('vinyl-buffer');
const source = require ('vinyl-source-stream');
const babelify = require ('babelify');
const browserify = require ('browserify');
const watchify = require ('watchify');
const uglify = require ('gulp-uglify');
const gzip = require ('gulp-gzip');
const concat = require('gulp-concat');
const sourcemaps = require ('gulp-sourcemaps');

const browserifyConfig =  {
  entries: 'src/client/main/components/App.jsx',
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
  'jspath',
  'node-fetch',
  'react',
  'react-dom',
  'react-masonry-component',
  'react-redux',
  'react-router',
  'react-router-scroll',
  'redux',
  'redux-thunk',
  'whatwg-fetch',
];

const fonts = [
  'src/client/fonts/**/*',
//  'node_modules/bootstrap/dist/fonts/*'
];

const vendorStyles = [
//  'node_modules/bootstrap/dist/css/bootstrap.min.css',
//  'node_modules/materialize-css/dist/css/materialize.min.css'
];

const vendorClientJS = [
  'node_modules/jquery/dist/jquery.min.js',
//  'node_modules/bootstrap/dist/js/bootstrap.min.js',
  'node_modules/materialize-css/dist/js/materialize.min.js'
];

const stageDir = '../concierge-stage';

let base = 'dist';

var stdTasks = ['html', 'images', 'server', 'styles', 'fonts', 'vendor-styles', 'vendor-client-js' ];

gulp.task ('default',   [             ...stdTasks, 'vendor',       'browserify-watch', 'watch']);
gulp.task ('no-watch',  [             ...stdTasks, 'vendor',       'browserify' ]);
gulp.task ('stage',     ['set-stage', ...stdTasks, 'vendor-stage', 'browserify-stage' ]);

// set the destination for staging output and copy stage root files
gulp.task ('set-stage', function () {
  base = `${stageDir}/dist`;
  return gulp.src (['stage/*', 'stage/.*'])
    .pipe (gulp.dest (stageDir));
});

// set watch tasks for continous build
gulp.task ('watch', function () {
  gulp.watch ('src/client/index.html', ['html']);
  gulp.watch ('src/client/images/**/*', ['images']);
  gulp.watch ('src/server/*.js', ['server']);
  gulp.watch (dependencies, ['vendor']);
  gulp.watch('src/client/css/**/*.scss', ['styles']);
  gulp.watch('src/client/fonts/**/*', ['fonts']);
});

// copy index.html and favicon.ico
gulp.task ('html', function () {
  return gulp.src (['src/client/index.html', 'src/client/favicon.ico'])
    .pipe (gulp.dest (`${base}/public`));
});

// copy images
gulp.task ('images', function () {
  return gulp.src ('src/client/images/**/*')
    .pipe (gulp.dest (`${base}/public/images`));
});

// copy fonts
gulp.task ('fonts', function () {
  return gulp.src (fonts)
    .pipe (gulp.dest (`${base}/public/fonts`));
});

// copy server
gulp.task( 'server', ['_service','_server']);

gulp.task ('_service', function () {
  return gulp.src ( 'src/client/m2016-service/index.js')
    .pipe (gulp.dest (base + '/m2016-service'));
});

gulp.task ('_server', function () {
  return gulp.src ( 'src/server/*.js')
    .pipe (gulp.dest (base));
});

// compile third-party dependencies
gulp.task ('vendor', function () {
  return browserify ()
    .require (dependencies)
    .bundle ()
    .pipe (source ('vendor.bundle.js'))
    .pipe (buffer ())
//    .pipe (uglify ({ mangle: false }))
    .pipe (gzip ({ append: true }))
    .pipe (gulp.dest (`${base}/public/js`));
});

gulp.task ('styles', function () {
  return gulp.src ('src/client/css/main.scss')
    .pipe(sourcemaps.init())
    .pipe (sass ().on ('error', sass.logError))
    .pipe(sourcemaps.write())
//    .pipe (cssmin ())
    .pipe (gulp.dest (`${base}/public/css`));
});

gulp.task ('vendor-styles', function () {
 return gulp.src( vendorStyles )
            .pipe(concat('vendor.css'))
            .pipe(gulp.dest(`${base}/public/css`));  
});

gulp.task ('vendor-client-js', function () {
 return gulp.src( vendorClientJS )
            .pipe(concat('vendor.browser.js'))
            .pipe(gulp.dest(`${base}/public/js`));  
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
      .pipe (gzip ({ append: true }))
      .pipe (sourcemaps.init ({ loadMaps: true }))
      .pipe (sourcemaps.write ('.'))
      .pipe (gulp.dest (`${base}/public/js/`));

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

// Tasks to prepare staging version of application

// Compile third-party dependencies
gulp.task ('vendor-stage', function () {
  process.env.NODE_ENV = 'production';
  return browserify ()
    .require (dependencies)
    .bundle ()
    .pipe (source ('vendor.bundle.js'))
    .pipe (buffer ())
    .pipe (uglify ({ mangle: false }))
    .pipe (gzip ({ append: true }))
    .pipe (gulp.dest (`${base}/public/js`));
});

gulp.task ('browserify-stage', function () {
  process.env.NODE_ENV = 'production';
  // browserifyConfig.debug = false;
  const bundler = browserify (browserifyConfig);
  bundler.external (dependencies);
  bundler.transform (babelify, babelifyOpts);
  bundler.on ('update', rebundle);
  return rebundle ();

  function rebundle () {
    const start = Date.now ();
    return bundler.bundle ()
      .on ('error', function (err) {
        gutil.log (gutil.colors.red (err.toString ()));
      })
      .on ('end', function () {
        gutil.log (gutil.colors.green ('Finished rebundling in', (Date.now () - start), 'ms.'));
      })
      .pipe (source ('bundle.js'))
      .pipe (buffer ())
      .pipe (uglify ({ mangle: false }))
      .pipe (gzip ({ append: true }))
      .pipe (gulp.dest (`${base}/public/js`));
  }
});
