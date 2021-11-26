const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const DefinePlugin = webpack.DefinePlugin;
const path = require('path');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

const settings = require('config');
const paths = require('./paths');
const tsConfigPath = path.resolve(paths.clientRoot, 'tsconfig.json');

module.exports = {
  mode: 'development',
  target: 'web',
  entry: [paths.appEntry],
  devtool: 'eval-source-map',
  output: {
    path: paths.distPath,
    filename: '[chunkhash].bundle.js'
  },
  devServer: {
    hot: 'only',
    historyApiFallback: true,
    port: settings.get('Client.port'),
    client: {
      overlay: {
        errors: true,
        warnings: false
      }
    },
  },
  plugins: [
    new DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(settings.get('env'))
    }),
    new HtmlWebpackPlugin({
      inject: true,
      template: paths.indexHtml,
      favicon: paths.favicon,
      templateParameters: {
        NODE_ENV: settings.get('env'),
        __APP_CONFIG__: JSON.stringify({
          env: settings.get('env'),
          hostUrl: settings.get('Server.address'),
          graphqlPath: settings.get('Server.graphqlPath'),
          expHours: settings.get('Auth.expHours'),
          devAuthTokenHeader: settings.get('Auth.devAuthTokenHeader')
        })
      },
    }),
    new ReactRefreshWebpackPlugin(),
    new ForkTsCheckerWebpackPlugin({ typescript: { configFile: tsConfigPath } })
  ],
  resolve: {
    extensions: ['.tsx', '.ts', '.jsx', '.js'],
    plugins: [new TsconfigPathsPlugin({ configFile: tsConfigPath })]
  },
  module: {    
    rules: [
      {
        test: /\.(js|ts)x?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: { 
            root: paths.clientRoot
          }
        }
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          // Creates `style` nodes from JS strings
          "style-loader",
          // Translates CSS into CommonJS
          "css-loader",
          // Compiles Sass to CSS
          "sass-loader",
          // Transform and autoprefix
          "postcss-loader"
        ],
      },
      // Images: Copy image files to build folder
      { test: /\.(?:ico|gif|png|jpg|jpeg)$/i, type: 'asset/resource' },

      // Fonts and SVGs: Inline files
      { test: /\.(woff(2)?|eot|ttf|otf|svg|)$/, type: 'asset/inline' },      
    ]
  }
};