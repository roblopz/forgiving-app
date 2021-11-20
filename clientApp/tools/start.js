const Webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');

const config = require('./webpack.dev.config');

const compiler = Webpack(config);
const server = new WebpackDevServer(config.devServer, compiler);

(async () => {
  await server.start();
  console.log('Started the development server');
})();
