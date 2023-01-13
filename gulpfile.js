import gulp from 'gulp';
import plumber from 'gulp-plumber';
import sass from 'gulp-dart-sass';
import postcss from 'gulp-postcss';
import autoprefixer from 'autoprefixer';
import browser from 'browser-sync';
import squoosh from 'gulp-libsquoosh';
import svgSprite from 'gulp-svg-sprite';
import { stacksvg } from "gulp-stacksvg";


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

//Webp

function webptask(wherefrom) {

  return gulp.src(`${wherefrom}*.{jpg,png}`)
  .pipe(squoosh({
    webp: {}
    }))
    .pipe(gulp.dest(`${wherefrom}/webp`))
  }

export const createWebp = (done) => {
  webptask('source/img/advantages/');
  webptask('source/img/gallery/');
  webptask('source/img/video/');
  done();
}

//SVG Sprite

export const createSvgStack = () => {
  return gulp.src('source/img/decore/background/*.svg')
  .pipe (stacksvg({output: 'decore-backgrounds-stack.svg'}))
  .pipe (gulp.dest('source/img/decore'))
}

export const createSvgSprite = () => {
  return gulp.src('source/img/decore/inline/*.svg')
  .pipe (svgSprite({mode: {symbol: {sprite: 'decore-symbol-sprite.svg', dest: '.'}}, sgv: {dimensionAttributes: true}}))
  .pipe (gulp.dest('source/img/decore'))
}


export default gulp.series(
  styles, server, watcher
);
