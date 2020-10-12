import gulp from 'gulp';
import sass from 'gulp-sass';
import uglifycss from 'gulp-uglifycss';
import browserSync from 'browser-sync';

// compile SCSS into CSS
function Comp() {
  return gulp.src('./scss/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./css'))
    .pipe(browserSync.create().stream());
}
// minifies the css
function Mini() {
  return gulp.src('./css/*.css')
    .pipe(uglifycss({
      maxLineLen: 80,
      uglyComments: true,
    }))
    .pipe(gulp.dest('./dist/'));
}
// watch the code changes
function Watch() {
  browserSync.create().init({
    server: {
      baseDir: './',
    },
  });
  gulp.watch('./scss/**/*.scss', Comp);
  gulp.watch('./css/*.css', Mini);
  gulp.watch('./*.html').on('change', browserSync.create().reload);
}

exports.Watch = Watch;
