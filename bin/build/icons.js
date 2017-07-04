const imagemin = require('gulp-imagemin');
const svgstore = require('gulp-svgstore');
const rename = require('gulp-rename');

module.exports = (gulp, config) => () => (
	gulp.src(`${config.icons.source}/*.svg`)
		.pipe(imagemin([
			imagemin.svgo({
				plugins: [{
					removeAttrs: {
						attrs: '(fill|stroke|style)',
					},
				}],
			}),
		]))
		.pipe(gulp.dest(config.icons.destination))
		.pipe(svgstore())
		.pipe(rename('sprite.svg'))
		.pipe(gulp.dest(config.icons.destination))
);
