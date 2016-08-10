/* eslint prefer-arrow-callback: off */
/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */
const gulp = require ('gulp');
const gutil = require ('gulp-util');
const cssmin = require ('gulp-cssmin');
const sass = require ('gulp-sass');
const buffer = require ('vinyl-buffer');
const source = require ('vinyl-source-stream');
const babelify = require ('babelify');
const browserify = require ('browserify');
const watchify = require ('watchify');
const uglify = require ('gulp-uglify');
const gzip = require ('gulp-gzip');
const sourcemaps = require ('gulp-sourcemaps');

const dependencies = [
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

const stageDir = '../concierge-stage';
let base = 'dist';

gulp.task ('default', ['html', 'images', 'server', 'data', 'styles', 'fonts',
  'vendor', 'browserify-watch', 'watch']);
gulp.task ('stage', ['set-stage', 'html', 'images', 'server', 'data',
  'styles', 'fonts', 'vendor-stage', 'browserify-stage']);

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
  gulp.watch ('src/server/public/data/data.js', ['data']);
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
  return gulp.src ('src/client/fonts/**/*')
    .pipe (gulp.dest (`${base}/public/fonts`));
});

// copy server
gulp.task ('server', function () {
  return gulp.src ('src/server/*.js')
    .pipe (gulp.dest (base));
});

// copy pre-packaged data
gulp.task ('data', function () {
  return gulp.src ('src/server/public/js/data.js')
    .pipe (gulp.dest (`${base}/public/js`));
});

// compile third-party dependencies
gulp.task ('vendor', function () {
  return browserify ()
    .require (dependencies)
    .bundle ()
    .pipe (source ('vendor.bundle.js'))
    .pipe (buffer ())
    .pipe (uglify ({ mangle: false }))
    .pipe (gzip ({ append: true }))
    .pipe (gulp.dest (`${base}/public/js`));
});

gulp.task ('styles', function () {
  return gulp.src ('src/client/css/main.scss')
    .pipe (sass ().on ('error', sass.logError))
    .pipe (cssmin ())
    .pipe (gulp.dest (`${base}/public/css`));
});

gulp.task ('browserify-watch', function () {
  const config = {
    entries: 'src/client/main/components/App.jsx',
    debug: true,
  };
  const bundler = watchify (browserify (config, watchify.args));
  bundler.external (dependencies);
  bundler.transform (babelify, { presets: ['es2015', 'react'] });
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
      .pipe (gzip ({ append: true }))
      .pipe (sourcemaps.init ({ loadMaps: true }))
      .pipe (sourcemaps.write ('.'))
      .pipe (gulp.dest (`${base}/public/js/`));
  }
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
  const bundler = browserify ({ entries: 'src/client/main/components/App.jsx', debug: true });
  bundler.external (dependencies);
  bundler.transform (babelify, { presets: ['es2015', 'react'] });
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
