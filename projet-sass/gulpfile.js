// Requis
var gulp = require('gulp');
var concatCss = require('gulp-concat-css');
var sass = require('gulp-sass');
var runSequence = require('run-sequence');
var clean = require('gulp-clean');
// Include plugins
var plugins = require('gulp-load-plugins')(); // tous les plugins de package.json


// Variables de chemins
var source = './src'; // dossier de travail
var destination = './dist'; // dossier à livrer


gulp.task('clean', function () {
    return gulp.src(destination + '/assets/css/*.css')
        .pipe(clean({force: true}))
        // .pipe(gulp.dest('dist'));
});


// transforme le scss en css
gulp.task('css', function () {
  return gulp.src(source + '/assets/css/starter.scss')
    .pipe(plugins.sass())
    .pipe(plugins.csscomb())
    .pipe(plugins.cssbeautify({indent: '  '}))
    .pipe(plugins.autoprefixer())
    .pipe(gulp.dest(destination + '/assets/css/'));
});


// Concatenation du CSS
// gulp.task('concat', function () {
//   return gulp.src(destination + '/assets/css/*.css')
//     .pipe(concatCss("bundle.css"))
//     .pipe(gulp.dest(destination + '/assets/css/'));
// });


// gulp.task('saas', function () {
//   return gulp.src(source + '/assets/css/starts.css')
//     .pipe(sass())
//     .pipe(gulp.dest(destination + '/assets/temp/'));
// });


// Tâche "minify" = minification CSS (destination -> destination)
gulp.task('minify', function () {
  return gulp.src(destination + '/assets/css/starter.css')
    .pipe(plugins.csso())
    .pipe(plugins.rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest(destination + '/assets/css/minify'));
});



gulp.task('build', function(callback) {
  runSequence('clean',
  				'css',
              'minify',
              callback);
});



// Tâche "build"
// gulp.task('build', ['saas','minify']);


// Tâche "watch" = je surveille *sass
gulp.task('watch', function () {
  gulp.watch(source + '/assets/css/*.scss', ['build']);
});


