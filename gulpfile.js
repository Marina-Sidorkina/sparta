const { src, dest, parallel, series, watch } = require('gulp');
const browserSync = require('browser-sync').create();
const concat = require('gulp-concat');
const uglify = require('gulp-uglify-es').default;
const sourcemaps = require("gulp-sourcemaps");

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

exports.browsersync = browsersync;
exports.scripts = scripts;
