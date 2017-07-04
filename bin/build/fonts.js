module.exports = (gulp, config) => () => gulp.src(`${config.fonts.source}/*`)
	.pipe(gulp.dest(config.fonts.destination));
