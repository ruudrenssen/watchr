const plumber = require('gulp-plumber');
const postcss = require('gulp-postcss');
const sass = require('gulp-sass');
const sassGlob = require('gulp-sass-glob');
const sourcemaps = require('gulp-sourcemaps');
const stylelint = require('gulp-stylelint');
const util = require('gulp-util');

const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const postcssImport = require('postcss-import');

const OPTIONS_PLUMBER = {
	errorHandler(err) {
		util.log(util.colors.red(err.message));
		this.emit('end');
	},
};

const OPTIONS_POSTCSS = [
	postcssImport(),
	autoprefixer(),
	cssnano({
		discardComments: {
			removeAll: true,
		},
		safe: true,
	}),
];

const OPTIONS_SASS = {
	includePaths: [
		'./node_modules',
	],
};

const OPTIONS_STYLELINT = {
	reporters: [
		{
			formatter: 'string',
			console: true,
		},
	],
};

module.exports = (gulp, config) => ({
	compile() {
		const { isWatching } = config;

		return gulp
			.src(`${config.styles.source}/*.scss`)
			.pipe(isWatching ? plumber(OPTIONS_PLUMBER) : util.noop())
			.pipe(sourcemaps.init())
			.pipe(sassGlob())
			.pipe(sass(OPTIONS_SASS))
			.pipe(postcss(OPTIONS_POSTCSS))
			.pipe(sourcemaps.write('.'))
			.pipe(gulp.dest(config.styles.destination));
	},

	test() {
		const { isWatching } = config;

		return gulp
			.src(`${config.styles.source}/**/*.scss`, {
				since: gulp.lastRun('styles:test'),
			})
			.pipe(isWatching ? plumber(OPTIONS_PLUMBER) : util.noop())
			.pipe(stylelint(OPTIONS_STYLELINT));
	},
});
