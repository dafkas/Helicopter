const gulp = require('gulp');
const sass = require('gulp-sass');
const notify = require('gulp-notify');
const autoprefixer = require('gulp-autoprefixer');

gulp.task('sass', function () {
  return gulp.src('./sass/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('dist/css'))
    .pipe(autoprefixer({
       browsers: ['last 2 versions']
    }))
    .pipe(notify('Sass compiled.'));
});

gulp.task('sass:watch', function () {
  gulp.watch('./sass/*.scss', ['sass']);
});

gulp.task('default', ['sass', 'sass:watch']);
