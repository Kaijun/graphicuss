var webpack = require('webpack')
var path = require('path')
var nodeModulesExternals = require('webpack-node-externals');

module.exports = {
  context: __dirname,
  entry: './index.js',
  output: {
    path: path.join(__dirname, '../dist'),
    filename: 'index.js',
  },
  target: 'node',
  node: {
    __dirname: false,
    __filename: false,
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel?presets[]=es2015-node6'
      },
      { test: /\.json$/, loader: "json-loader" }
    ],
  },
  externals: [nodeModulesExternals()], // in order to ignore all modules in node_modules folder

  // devtool: 'source-map',
}
