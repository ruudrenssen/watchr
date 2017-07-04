const del = require('del');

module.exports = (gulp, config) => () => del([
	`${config.styles.destination}/*`,
]);
