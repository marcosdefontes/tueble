const webpack = require('webpack');
const merge = require('webpack-merge');
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const path = require('path');
const { VueLoaderPlugin } = require('vue-loader')

var config = {
    output: {
        path: path.resolve(__dirname + '/dist/'),
      },
    module: {
      rules: [
        {
          test: /\.js$/,
          loader: 'babel-loader',
          include: __dirname,
          exclude: /node_modules/
        },
        {
          test: /\.vue$/,
          loader: 'vue-loader'
        },
        {
          test: /\.css$/,
          loader: 'style!less!css'
        }
      ]
    }, 
    plugins: [
        // make sure to include the plugin!
        new VueLoaderPlugin()
      ]  
  };

  module.exports = {
    optimization: {
      minimizer: [
        // we specify a custom UglifyJsPlugin here to get source maps in production
        new UglifyJsPlugin({
          cache: true,
          parallel: true,
          uglifyOptions: {
            compress: false,
            ecma: 6,
            mangle: true
          },
          sourceMap: true
        })
      ]
    }
  };

  module.exports = [
    merge(config, {
      entry: path.resolve(__dirname + '/src/plugin.js'),
      output: {
        filename: 'tueble.min.js',
        libraryTarget: 'window',
        library: 'Tueble',
      }
    }),
    merge(config, {
      entry: path.resolve(__dirname + '/src/TableComponent.vue'),
      output: {
        filename: 'tueble.js',
        libraryTarget: 'umd',
        library: 'tueble',
        umdNamedDefine: true
      }
    })
  ];