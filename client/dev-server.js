import webpack from 'webpack'
import WebpackDevServer from 'webpack-dev-server'
import webpackConfig from './webpack.config.js'

const CLIENT_PORT = 3000
const SERVER_PORT = 3001

webpackConfig.entry.jsx = [webpackConfig.entry.jsx]
webpackConfig.entry.jsx.unshift(`webpack-dev-server/client?http://localhost:${CLIENT_PORT}/`, "webpack/hot/dev-server")
webpackConfig.plugins.push(new webpack.HotModuleReplacementPlugin())

const devServer= new WebpackDevServer(webpack(webpackConfig), {
  contentBase: __dirname,
  hot: true,
  historyApiFallback: true,
  //proxy the server port, easy to avoid cross-domain while requesting the APIs
  proxy: {
    "/api/*": `http://localhost:${SERVER_PORT}`,
    "/uploads/*": `http://localhost:${SERVER_PORT}`,
    // "*": `http://localhost:${SERVER_PORT}`
  },
  stats: { colors: true },
}).listen(CLIENT_PORT, () => {
  console.log(`Client Dev Server running on port ${CLIENT_PORT}!`)
})
