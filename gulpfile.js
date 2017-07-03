const gulp = require('gulp');

const config = require('./bin/build/config');
const clean = require('./bin/build/clean')(gulp, config);
const fonts = require('./bin/build/fonts')(gulp, config);
const icons = require('./bin/build/icons')(gulp, config);
const images = require('./bin/build/images')(gulp, config);
const styles = require('./bin/build/styles')(gulp, config);
const styleguide = require('./bin/build/styleguide')(gulp, config);

const enableWatch = (done) => {
	config.isWatching = true;
	done();
};

gulp.task('clean', clean);
gulp.task('fonts', fonts);
gulp.task('icons', icons);
gulp.task('images', images);

gulp.task('styles:compile', styles.compile);
gulp.task('styles:test', styles.test);
gulp.task('styles', gulp.series('styles:test', 'styles:compile'));

gulp.task('styleguide:build', styleguide.build);
gulp.task('styleguide:start', styleguide.start);
gulp.task('styleguide', gulp.series('styleguide:build'));

gulp.task('build', gulp.series('clean', gulp.parallel('fonts', 'icons', 'images', 'styles'), 'styleguide'));

gulp.task('watch', gulp.series(enableWatch, () => {
	gulp.watch(`${config.icons.source}/**/*.{svg}`, gulp.task('icons'));
	gulp.watch(`${config.images.source}/**/*.{gif,jpg,png,svg}`, gulp.task('images'));
	gulp.watch(`${config.styles.source}/**/*.scss`, gulp.task('styles'));
}));

gulp.task('default', gulp.series(enableWatch, 'build', gulp.parallel('styleguide:start', 'watch')));
