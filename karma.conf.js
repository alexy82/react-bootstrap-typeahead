/* eslint-env node */

var webpackConfigBase = require('./webpack/webpack.config.base');

module.exports = function(config) {
  config.set({
    browsers: [process.env.TRAVIS ? 'Chrome_travis_ci' : 'Chrome'],
    client: {
      // Don't show console output.
      captureConsole: false,
    },
    customLaunchers: {
      Chrome_travis_ci: {
        base: 'Chrome',
        flags: ['--no-sandbox'],
      },
    },
    files: ['tests.webpack.js'],
    frameworks: ['mocha', 'chai'],
    preprocessors: {
      'tests.webpack.js': ['webpack', 'sourcemap'],
    },
    reporters: ['dots'],
    singleRun: true,
    webpack: Object.assign(webpackConfigBase, {
      devtool: 'inline-source-map',
    }),
    webpackServer: {
      noInfo: true,
    },
  });
};
