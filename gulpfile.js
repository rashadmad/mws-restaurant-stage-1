const gulp = require('gulp');
const sass = require('gulp-sass');
const log = require('fancy-log');
const prefixer = require('gulp-autoprefixer');
const browserSync = require('browser-sync').create();

const sassFiles = 'scss/**/*.scss';

gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: '/mws-restaurant-stage-1'
    },
  })
})

gulp.task('styles', function(){
  return gulp.src(sassFiles)
    .pipe(sass()) // Converts Sass to CSS with gulp-sass
    .on("error", sass.logError)
    .pipe(prefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
    .pipe(gulp.dest('css'))
    .pipe(browserSync.reload({
      stream: true
    }))
});

gulp.task('watch', function() {
    gulp.watch(sassFiles, gulp.series('styles'));
});

gulp.task('default', gulp.parallel('watch','browserSync', function() {
  log("css file updated");
}));
