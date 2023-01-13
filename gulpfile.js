import gulp from 'gulp';
import plumber from 'gulp-plumber';
import sass from 'gulp-dart-sass';
import postcss from 'gulp-postcss';
import autoprefixer from 'autoprefixer';
import browser from 'browser-sync';
//import webp from 'gulp-webp';
import squoosh from 'gulp-libsquoosh';

// Styles

export const styles = () => {
  return gulp.src('source/sass/style.scss', { sourcemaps: true })
    .pipe(plumber())
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss([
      autoprefixer()
    ]))
    .pipe(gulp.dest('source/css', { sourcemaps: '.' }))
    .pipe(browser.stream());
}

// Server

const server = (done) => {
  browser.init({
    server: {
      baseDir: 'source'
    },
    cors: true,
    notify: false,
    ui: false,
  });
  done();
}

// Watcher

const watcher = () => {
  gulp.watch('source/sass/**/*.scss', gulp.series(styles));
  gulp.watch('source/*.html').on('change', browser.reload);
}

export const createWebp = (done) => {
  function webptask(wherefrom) {

  return gulp.src(`${wherefrom}*.{jpg,png}`)
  .pipe(squoosh({
    webp: {}
    }))
    .pipe(gulp.dest(`${wherefrom}/webp`))
  }
  webptask('source/img/advantages/');
  webptask('source/img/gallery/');
  done();
}


export default gulp.series(
  styles, server, watcher
);
