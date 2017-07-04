const imagemin = require('gulp-imagemin');
const newer = require('gulp-newer');

module.exports = (gulp, config) => () => (
	gulp.src(`${config.images.source}/**/*`)
		.pipe(newer(config.images.destination))
		.pipe(imagemin([
			imagemin.jpegtran({
				progressive: true,
			}),
			imagemin.optipng({
				optimizationLevel: 7,
			}),
		]))
		.pipe(gulp.dest(config.images.destination))
);
