var clone= require('clone');
var paths = require('./build/paths');
var webpackConfig = clone(require('./webpack.config.js'));


// Add istanbul-instrumenter to webpack configuration
webpackConfig.module.loaders.push(
    {
        test: /\.js$/,
        exclude: /(node_modules|test)/,
        loader: 'babel-istanbul-loader'
    }
);

webpackConfig.output.filename += '.test';
webpackConfig.plugins = [];
webpackConfig.externals = [];


// The main configuration
module.exports = function(config) {
    config.set({
        frameworks: [
            'jasmine-jquery',
            'jasmine-ajax',
            'jasmine'
        ],

        files: [
            'test/*.spec.js',
        ],

        preprocessors: {
            'test/*.spec.js': [
                'webpack'
            ],
        },

        coverageReporter: {
            reporters: [
                { type: 'lcov', dir: paths.coverageDir },
                { type: 'text' }
            ]
        },

        webpack: webpackConfig,

        webpackMiddleware: {
            noInfo: true
        },

        reporters: (process.env.TRAVIS) ? ['spec', 'coverage', 'coveralls'] : ['spec', 'coverage'],

        browsers: ['Chrome', 'Firefox'],
    });
}
