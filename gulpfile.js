const { src, dest, parallel, series, watch } = require("gulp");
const browsersync = require("browser-sync").create();
const concat = require("gulp-concat");
const uglify = require("gulp-uglify-es").default;
const babel = require('gulp-babel');
const sourcemaps = require("gulp-sourcemaps");
const sass = require("gulp-sass");
const autoprefixer = require("gulp-autoprefixer");
const cleancss = require("gulp-clean-css");
const imagemin = require("gulp-imagemin");
const newer = require("gulp-newer");
const del = require("del");

// Server

function server() {
  browsersync.init({
    server: { baseDir: "source/" },
    notify: false,
    online: true
  })
}

// Scripts

function scripts() {
  return src([
		"source/js/blocks/slider/controls.js",
    "source/js/blocks/slider/button.js",
    "source/js/blocks/modal/open.js"
	])
  .pipe(sourcemaps.init())
	.pipe(babel({
		presets: ['@babel/env']
	}))
	.pipe(concat("index.min.js"))
	.pipe(uglify())
  .pipe(sourcemaps.write("."))
	.pipe(dest("source/js/"))
	.pipe(browsersync.stream())
}

// Styles

function styles() {
	return src("source/sass/index.scss")
  .pipe(sourcemaps.init())
	.pipe(sass())
	.pipe(concat("index.min.css"))
	.pipe(autoprefixer({
    overrideBrowserslist: ["last 3 versions"],
    grid: true
  }))
	.pipe(cleancss({
    level: {
      1: {
        specialComments: 0
      }
    }
  }))
  .pipe(sourcemaps.write("."))
	.pipe(dest("source/css/"))
	.pipe(browsersync.stream())
}

// Images

function images() {
	return src("source/images/src/**/*")
	.pipe(newer("source/images/dest/"))
	.pipe(imagemin())
	.pipe(dest("source/images/dest/"))
}

function deleteImages() {
	return del("source/images/dest/**/*", { force: true })
}

// Build

function build() {
	return src([
		"source/css/**/*.min.css",
		"source/js/**/*.min.js",
		"source/images/dest/**/*",
		"source/**/*.html",
    "source/fonts/**/*.{woff,woff2}",
		], { base: "source" })
	.pipe(dest("build"))
}

function deleteBuild() {
	return del("build/**/*", { force: true })
}

// Watcher

function watcher() {
 	watch(["source/**/*.js", "!source/**/*.min.js"], scripts);
  watch("source/**/sass/**/*", styles);
  watch("source/**/*.html").on("change", browsersync.reload);
  watch("source/images/src/**/*", images);
}

// Tasks

exports.server = server;
exports.scripts = scripts;
exports.styles = styles;
exports.images = images;
exports.deleteImages = deleteImages;

exports.build = series(deleteBuild, styles, scripts, deleteImages, images, build);
exports.default = series(parallel(styles, scripts, images), parallel(server, watcher));
