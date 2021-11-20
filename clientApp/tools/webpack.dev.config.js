const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const DefinePlugin = webpack.DefinePlugin;
const path = require('path');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

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
    hot: true,
    historyApiFallback: true,
    port: 3000
  },
  plugins: [
    new DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development')
    }),
    new HtmlWebpackPlugin({
      inject: true,
      template: paths.indexHtml,
      favicon: path.resolve(paths.assets, 'favicon.ico')
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