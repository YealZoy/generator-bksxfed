const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin'); 
const output = path.resolve(__dirname,'./app/dll/manifest.json');
function postcss() {
  var precss = require('precss');
  var autoprefixer = require('autoprefixer');
    return [precss, autoprefixer({
      remove: false,
      browsers: ['ie >= 8', '> 1% in CN'],
    })];
};
module.exports = {
  output: {
    path: path.resolve(__dirname,'./app/dll'),
    filename: '[name].js',
    library: '[name]', 
  },
  entry: require('./otherLib.js'),
  plugins: [
    new webpack.DllPlugin({
      path: output, 
      name: '[name]',  
      context: __dirname 
    }),
  
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery',
      'window.$': 'jquery',
    }),
    new ExtractTextPlugin('[name].css'), 
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
      },
    }),
    new webpack.LoaderOptionsPlugin({
      options: {
          postcss: postcss
        }
    })
  ],
  module:require('./webpack-config/module.config.js'),
  resolve:require('./webpack-config/resolve.config.js'),
};
