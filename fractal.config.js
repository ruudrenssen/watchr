const fractal = require('@frctl/fractal').create();

fractal.set('project.title', 'Watchr');
fractal.components.set('path', `${__dirname}/src/components`);
fractal.components.set('default.status', 'prototype');
fractal.docs.set('path', `${__dirname}/src/docs`);
fractal.web.set('builder.dest', `${__dirname}/docs`);
fractal.web.set('static.path', `${__dirname}/dist`);

module.exports = fractal;

