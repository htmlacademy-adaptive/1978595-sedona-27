import gulp from 'gulp';
import plumber from 'gulp-plumber';
import sass from 'gulp-dart-sass';
import postcss from 'gulp-postcss';
import autoprefixer from 'autoprefixer';
import browser from 'browser-sync';
import squoosh from 'gulp-libsquoosh';
import svgSprite from 'gulp-svg-sprite';
import { stacksvg } from 'gulp-stacksvg';
import htmlmin from 'gulp-htmlmin';
import svgmin from 'gulp-svgmin';
import cssmin from 'gulp-cssmin';
import {deleteAsync} from 'del';


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
  .pipe (svgSprite({mode: {symbol: {sprite: 'decore-symbol-sprite.svg', dest: '.'}}}))
  .pipe (gulp.dest('source/img/decore'))
}

//HTML Minify

export const htmlMin = () => {
  return gulp.src('source/*.html')
  .pipe(htmlmin({ collapseWhitespace: true }))
  .pipe(gulp.dest('build'));
}

//IMGOptimize

export const optImages = () => {
  return gulp.src('source/img/**/*.{png,jpg}')
  .pipe(squoosh())
  .pipe(gulp.dest('build/img'))
  }

export  const svgOpt = () =>
  gulp.src('source/img/*.svg')
  .pipe(svgmin())
  .pipe(gulp.dest('build/img'));

//CSS Minify

export const cssMin = (done) => {
  gulp.src('source/css/style.css')
  .pipe(cssmin())
  .pipe(gulp.dest('build/css'))
  done();
}

// Scripts

export const scripts = () => {
  return gulp.src(['source/js/*.js','!source/js/*--debug*'])
  .pipe(gulp.dest('build/js'))
  }

//Copying fles

export const copy = (done) => {
  gulp.src('source/fonts/*.{woff,woff2}')
  .pipe(gulp.dest('build/fonts/'))
  gulp.src('source/img/**/*.webp')
  .pipe(gulp.dest('build/img/'))
  gulp.src('source/favicon.ico')
  .pipe(gulp.dest('build/'))
  gulp.src('source/manifest.webmanifest')
  .pipe(gulp.dest('build/'))
  gulp.src('source/img/favicons/*')
  .pipe(gulp.dest('build/img/favicons/'))
  gulp.src('source/img/decore/{decore-backgrounds-stack.svg,decore-symbol-sprite.svg}')
  .pipe(gulp.dest('build/img/decore/'))
  done();
}

// Clean

export const clean = () => {
  return deleteAsync('build')
  };

  //Build

  export const build = gulp.series(
    clean,
    styles,
    htmlMin,
    optImages,
    svgOpt,
    cssMin,
    scripts,
    copy
);

// Server for build

export const serverBuild = (done) => {
  browser.init({
    server: {
      baseDir: 'build'
    },
    cors: true,
    notify: false,
    ui: false,
  });
  done();
}

// Reload

const reload = (done) => {
  browser.reload();
  done();
  }

  // Watcher for Build

  const watcherBuild = () => {
  gulp.watch('source/sass/**/*.scss', gulp.series(styles, cssMin, reload));
  gulp.watch('source/js/script.js', gulp.series(scripts, reload));
  gulp.watch('source/*.html', gulp.series(htmlmin, reload));
  }

export const startDev = gulp.series(styles, server, watcher);

export default gulp.series(
  build, serverBuild, watcherBuild
);





