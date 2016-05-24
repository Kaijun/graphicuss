var rucksack = require('rucksack-css')
var webpack = require('webpack')
var path = require('path')

module.exports = {
  context: __dirname,
  entry: {
    jsx: './index.js',
    html: './index.html',
    vendor: ['react']
  },
  output: {
    path: path.join(__dirname, '../dist', 'static'),
    filename: 'bundle.js',
  },
  module: {
    loaders: [
      {
        test: /\.html$/,
        loader: 'file?name=[name].[ext]'
      },
      {
        test: /\.(css|scss|sass)$/,
        include: /client/,
        loaders: [
          'style',
          'css?modules&sourceMap&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]',
          'resolve-url',
          'sass?sourceMap',
          'postcss'
        ]
      },
      {
        test: /\.css$/,
        include: /node_modules/,
        loader: 'style!css?sourceMap'
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loaders: [
          'react-hot',
          'babel'
        ]
      },
    ],
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  postcss: [
    rucksack({
      autoprefixer: true
    })
  ],
  plugins: [
    new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.bundle.js'),
    new webpack.DefinePlugin({
      'process.env': { NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'development') }
    })
  ],
  devServer: {
    contentBase: __dirname,
    hot: true
  }
}
