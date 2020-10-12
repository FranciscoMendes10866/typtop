import gulp from 'gulp';
import sass from 'gulp-sass';
import uglifycss from 'gulp-uglifycss';
import browserSync from 'browser-sync';

// compile SCSS into CSS
function compile() {
  return gulp.src('./scss/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./css'))
    .pipe(browserSync.create().stream());
}
// minifies the css
function Minify() {
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
  gulp.watch('./scss/**/*.scss', compile);
  gulp.watch('./css/*.css', Minify);
  gulp.watch('./*.html').on('change', browserSync.create().reload);
}

exports.Watch = Watch;
