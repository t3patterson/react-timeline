"use strict";


//Import Modules
var gulp = require('gulp');
var connect = require('gulp-connect'); // runs a local dev server
var open = require('gulp-open'); // Open a url in the web browser

var browserify = require('browserify');
var reactify = require('reactify');
var source = require('vinyl-source-stream');

var uglify = require('gulp-uglify');
var esLint = require('gulp-eslint');  
var buffer = require('vinyl-buffer');

var concat = require('gulp-concat');

var sass = require('gulp-sass');
var scsslint = require('gulp-scss-lint');
var sourcemaps = require('gulp-sourcemaps');
var cssnano = require('gulp-cssnano');

var runSequence = require('run-sequence');



//Setup Configuration Options
var config = {
  port: 3001,
  devBaseUrl: 'http://localhost',
  paths: {
    html: './src/*.html',
    images: './src/images/*',
    js: './src/**/*.js',
    scss: './src/scss/**/*.scss',
    cssBundleIncludes: [
      './dist/css/includes/lib/bootstrap.css',
      './dist/css/includes/lib/bs-timeline-styles.css',
      './dist/css/includes/styles.css'
    ],
    dist: './dist',
    mainJs: './src/main.js'
  }
}

//Start a local dev server
gulp.task('connect', function(){
  connect.server({
    root: ['dist'],
    port: config.port,
    base: config.devBaseUrl,
    livereload: true,
    fallback: 'dist/index.html' 
    // add this so that the fallback index.html is rendered
  })
});

//'open' task will run after the 'connect' task
gulp.task('open', ['connect'], function(){
  console.log( config.devBaseUrl + ":" + config.port + "/" )
  gulp.src('dist/index.html') // open the file at this location in the fs
    .pipe(open(
      '',
      { url: config.devBaseUrl + ":" + config.port + "/"}
    ) 
  ); //opens http://localhost:3000
});

gulp.task('html', function(){
  gulp.src( config.paths.html ) //get html files
    .pipe( gulp.dest(config.paths.dist) ) // pipe them thru to the dist folder
    .pipe( connect.reload() ) // reload the page
});

gulp.task('images', function(){

  gulp.src(config.paths.images)
    .pipe(gulp.dest(config.paths.dist+'/images'))
    .pipe(connect.reload())

});

gulp.task('js', function(){
  browserify(config.paths.mainJs)
    .transform(reactify)
    .bundle()
    .on('error', console.error.bind(console))
    .pipe( source('bundle.js') )
    //.pipe( buffer() )
    //.pipe( uglify() )
    .on('error', console.error.bind(console))
    .pipe( gulp.dest(config.paths.dist+ '/scripts' ))
    .pipe(connect.reload());
});

gulp.task('js-lint',function(){
  return gulp.src(config.paths.js)
    .pipe(esLint({config: 'eslint.config.json'}))
    .pipe( esLint.format() )
})

gulp.task('scss', function(){
  gulp.src(config.paths.scss)
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(sourcemaps.write())
    .pipe(cssnano())
    .pipe( gulp.dest( config.paths.dist+"/css/includes" ) )
})

gulp.task('scss-lint', function(){
  console.log("===================================")
  console.log('----------   SCSS Lint  -----------')
  console.log("===================================")
  
  return gulp.src(config.paths.scss)
      .pipe( scsslint() );
})

gulp.task('bundle-css', ['scss-lint'] ,function(){
  console.log('====================');
  console.log('css files bundling.....');
  console.log('====================');

  runSequence('scss', function(){
    gulp.src(config.paths.cssBundleIncludes)
    .pipe(concat('bundle.css'))
    .pipe(gulp.dest(config.paths.dist + "/css"))
    .on('error', console.error.bind(console))
    .pipe(connect.reload());

  });

})

gulp.task('watch', function(){
  gulp.watch(config.paths.html, ['html']);
  gulp.watch(config.paths.js, ['js']);
  gulp.watch(config.paths.scss,['scss','scss-lint', 'bundle-css'])
});

gulp.task('default', ['html', 'images', 'scss', 'scss-lint', 'bundle-css', 'js', 'watch', 'js-lint', 'connect',]) 
  // gulp will run 'html', 'open', and 'watch' at when 'gulp' is typed in command line