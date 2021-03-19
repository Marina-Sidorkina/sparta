const { src, dest, parallel, series, watch } = require('gulp');
const browserSync = require('browser-sync').create();
const concat = require('gulp-concat');
const uglify = require('gulp-uglify-es').default;
const sourcemaps = require("gulp-sourcemaps");
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const cleancss = require('gulp-clean-css');
const imagemin = require('gulp-imagemin');
const newer = require('gulp-newer');
const del = require('del');

// Server

function browsersync() {
	browserSync.init({
		server: { baseDir: 'source/' },
		notify: false,
		online: true
	})
}

// Scripts

function scripts() {
	return src([
		'source/js/index.js'
		])
  .pipe(sourcemaps.init())
	.pipe(concat('index.min.js'))
	.pipe(uglify())
  .pipe(sourcemaps.write('.'))
	.pipe(dest('source/js/'))
	.pipe(browserSync.stream())
}

// Styles

function styles() {
	return src('source/sass/index.scss')
  .pipe(sourcemaps.init())
	.pipe(sass())
	.pipe(concat('index.min.css'))
	.pipe(autoprefixer({
    overrideBrowserslist: ['last 10 versions'],
    grid: true
  }))
	.pipe(cleancss({
    level: {
      1: {
        specialComments: 0
      }
    }
  }))
  .pipe(sourcemaps.write('.'))
	.pipe(dest('source/css/'))
	.pipe(browserSync.stream())
}

// Images

function images() {
	return src('source/images/src/**/*')
	.pipe(newer('source/images/dest/'))
	.pipe(imagemin())
	.pipe(dest('source/images/dest/'))
}

function cleanimg() {
	return del('source/images/dest/**/*', { force: true })
}

// Watcher

function startwatch() {
 	watch(['source/**/*.js', '!source/**/*.min.js'], scripts);
  watch('source/**/sass/**/*', styles);
  watch('source/**/*.html').on('change', browserSync.reload);
  watch('source/images/src/**/*', images);
}

// Tasks

exports.browsersync = browsersync;
exports.scripts = scripts;
exports.styles = styles;
exports.images = images;
exports.cleanimg = cleanimg;

exports.default = parallel(images, styles, scripts, browsersync, startwatch);
