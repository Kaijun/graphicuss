// var rucksack = require('rucksack-css')
// var webpack = require('webpack')
// var path = require('path')
// var nodeModulesExternals = require('webpack-node-externals');
//
// var clientWebpackConfig = {
//   context: path.join(__dirname, 'client'),
//   entry: {
//     jsx: './index.js',
//     html: './index.html',
//     vendor: ['react']
//   },
//   output: {
//     path: path.join(__dirname, 'dist', 'static'),
//     filename: 'bundle.js',
//   },
//   module: {
//     loaders: [
//       {
//         test: /\.html$/,
//         loader: 'file?name=[name].[ext]'
//       },
//       {
//         test: /\.css$/,
//         include: /client/,
//         loaders: [
//           'style-loader',
//           'css-loader?modules&sourceMap&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]',
//           'postcss-loader'
//         ]
//       },
//       {
//         test: /\.css$/,
//         exclude: /client/,
//         loader: 'style!css'
//       },
//       {
//         test: /\.(js|jsx)$/,
//         exclude: /node_modules/,
//         loaders: [
//           'react-hot',
//           'babel'
//         ]
//       },
//     ],
//   },
//   resolve: {
//     extensions: ['', '.js', '.jsx']
//   },
//   postcss: [
//     rucksack({
//       autoprefixer: true
//     })
//   ],
//   plugins: [
//     new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.bundle.js'),
//     new webpack.DefinePlugin({
//       'process.env': { NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'development') }
//     })
//   ],
//   devServer: {
//     contentBase: __dirname,
//     hot: true
//   }
// }
//
//
//
// var serverWebpackConfig = {
//   context: path.join(__dirname, 'server'),
//   entry: './index.js',
//   output: {
//     path: path.join(__dirname, 'dist'),
//     filename: 'index.js',
//   },
//   target: 'node',
//   node: {
//     __dirname: false,
//     __filename: false,
//   },
//   module: {
//     loaders: [
//       {
//         test: /\.js$/,
//         exclude: /node_modules/,
//         loader: 'babel?presets[]=es2015-node6'
//       },
//       { test: /\.json$/, loader: "json-loader" }
//     ],
//   },
//   externals: [nodeModulesExternals()], // in order to ignore all modules in node_modules folder
//
//   // devtool: 'source-map',
// }
//
//
// module.exports = [clientWebpackConfig, serverWebpackConfig]
