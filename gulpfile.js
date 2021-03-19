const { src, dest, parallel, series, watch } = require('gulp');
const browserSync = require('browser-sync').create();
const concat = require('gulp-concat');
const uglify = require('gulp-uglify-es').default;
const sourcemaps = require("gulp-sourcemaps");
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const cleancss = require('gulp-clean-css');

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

// Watcher

function startwatch() {
 	watch(['source/**/*.js', '!source/**/*.min.js'], scripts);
  watch('source/**/sass/**/*', styles);
  watch('source/**/*.html').on('change', browserSync.reload);
}

// Tasks

exports.browsersync = browsersync;
exports.scripts = scripts;
exports.styles = styles;

exports.default = parallel(styles, scripts, browsersync, startwatch);
