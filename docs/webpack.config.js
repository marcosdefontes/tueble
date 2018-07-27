const path = require('path');
const merge = require('webpack-merge');

module.exports = merge(require('../webpack.base'), {
    context: __dirname,

    entry: ['./app.js', './style.scss'],

    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'app.js',
        publicPath: '/build/',
    },

    resolve: {
        alias: {
            vue: 'vue/dist/vue.js',
        },
    },

    watch: true,

    devServer: {
        contentBase: __dirname,
        port: 2000,
    },
    module: {
        rules: [{
            test: /\.scss$/,
            use: [{
                    loader: 'file-loader',
                    options: {
                        name: '[name].css',
                        outputPath: 'assets/css/'
                    }
                },
                {
                    loader: 'extract-loader'
                },
                {
                    loader: 'css-loader'
                },
                {
                    loader: 'sass-loader'
                }
            ]
        }]
    },
});