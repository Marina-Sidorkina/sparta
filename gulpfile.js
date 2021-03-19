const { src, dest, parallel, series, watch } = require('gulp');
const browserSync = require('browser-sync').create();

// Server

function browsersync() {
	browserSync.init({
		server: { baseDir: 'source/' },
		notify: false,
		online: true
	})
}

exports.browsersync = browsersync;
