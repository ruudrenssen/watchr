const fractal = require('../../fractal.config');
const util = require('gulp-util');

module.exports = (gulp, config) => ({
	start() {
		const server = fractal.web.server({ sync: true });

		server.on('error', err => util.log(err.message));
		server.on('error', err => util.log(err.message));

		return server.start().then(() => util.log(`Fractal server is now running at ${server.url}`));
	},

	build() {
		const builder = fractal.web.builder();

		builder.on('error', err => util.log(err.message));

		return builder.build();
	},
});
