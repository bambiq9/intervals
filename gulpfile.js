const gulp = require('gulp');
const concat = require('gulp-concat-css');
const plumber = require('gulp-plumber');
const htmlMinify = require('html-minifier'); 
const browserSync = require('browser-sync').create();
const del = require('del');
const gulpPug = require('gulp-pug');
const sass = require('gulp-sass')(require('sass'));
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const mediaquery = require('postcss-combine-media-query');
const cssnano = require('cssnano');

function html(done) {
  const options = {
    removeComments: true,
    removeRedundantAttributes: true,
    removeScriptTypeAttributes: true,
    removeStyleLinkTypeAttributes: true,
    sortClassName: true,
    useShortDoctype: true,
    collapseWhitespace: true,
    minifyCSS: true,
    keepClosingSlash: true,
  };

  gulp.src('src/**/*.html')
    .pipe(plumber())
    .on('data', function (file) {
      console.log(`Processing file: var.${file.path}`); // Выводит обрабатываемый файл
      const buferFile = Buffer.from(htmlMinify.minify(file.contents.toString(), options));
      file.contents = buferFile;
    })
    .pipe(gulp.dest('dist/'))
    .on('end', () => {
      browserSync.reload();
      done();
    });
}

function pug(done) {
  gulp.src('src/pages/**/*.pug')
    .pipe(gulpPug({ pretty: true }))
    .pipe(gulp.dest('dist/'))
    .on('end', () => {
      browserSync.reload();
      done();
    });
}

function scripts(done) {
  gulp.src('src/scripts/**/*.js')
    .pipe(gulp.dest('dist/'))
    .on('end', () => {
      browserSync.reload();
      done();
    });
}

// function css(done) {
//   const plugins = [autoprefixer(), mediaquery(), cssnano()];

//   gulp.src('src/styles/**/*.css')
//     .pipe(plumber())
//     .pipe(concat('bundle.css'))
//     .pipe(postcss(plugins))
//     .pipe(gulp.dest('dist/'))
//     .on('end', () => {
//       browserSync.reload();
//       done();
//     });
// }

function scss(done) {
  const plugins = [autoprefixer(), mediaquery(), cssnano()];

  gulp.src('src/**/*.scss')
        .pipe(sass())
        .pipe(concat('bundle.css'))
        .pipe(postcss(plugins))
        .pipe(gulp.dest('dist/'))
        .on('end', () => {
          browserSync.reload();
          done();
        });
}

// function images(done) {
//   gulp.src('src/images/**/*.{jpg,png,svg,gif,ico,webp,avif}')
//     .pipe(gulp.dest('dist/images'))
//     .on('end', () => {
//       browserSync.reload();
//       done();
//     });
// }

// function videos(done) {
//   gulp.src('src/videos/**/*.{mp4,webm}')
//     .pipe(gulp.dest('dist/videos'))
//     .on('end', () => {
//       browserSync.reload();
//       done();
//     });
// }

function fonts(done) {
  gulp.src('src/fonts/**/*.{ttf,woff,woff2}')
    .pipe(gulp.dest('dist/fonts'))
    .on('end', () => {
      browserSync.reload();
      done();
    });
}

function clean() {
  return del('dist');
}

function watchFiles() {
  gulp.watch(['src/pages/**/*.pug'], pug);
  gulp.watch(['src/**/*.html'], html);
  gulp.watch(['src/**/*.js'], scripts);
  gulp.watch(['src/**/*.scss'], scss);
  // gulp.watch(['src/styles/**/*.css'], css);
  // gulp.watch(['src/images/**/*.{jpg,png,svg,gif,ico,webp,avif}'], images);
  // gulp.watch(['src/videos/**/*.{mp4,webm}'], videos);
  gulp.watch(['src/fonts/**/*.{ttf,woff,woff2}'], fonts);
}

function serve(done) {
  browserSync.init({
    server: { baseDir: './dist' },
  });
  done();
}

// const build = gulp.series(clean, gulp.parallel(pug, html, scss, images, videos, fonts));
const build = gulp.series(clean, gulp.parallel(pug, html, scripts, scss, fonts));
const watchapp = gulp.series(build, gulp.parallel(watchFiles, serve));

exports.html = html;
exports.pug = pug;
exports.scripts = scripts;
// exports.css = css;
exports.scss = scss;
// exports.images = images;
// exports.videos = videos;
exports.fonts = fonts;
exports.clean = clean;
exports.build = build;
exports.watchapp = watchapp;
exports.default = watchapp;
