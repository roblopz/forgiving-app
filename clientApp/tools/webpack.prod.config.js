const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const DefinePlugin = webpack.DefinePlugin;
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

process.env["NODE_CONFIG_DIR"] = path.resolve(__dirname, '../../common/config');
const settings = require('config');
const paths = require('./paths');
const tsConfigPath = path.resolve(paths.clientRoot, 'tsconfig.json');

module.exports = {
  mode: 'production',
  target: 'web',
  entry: [paths.appEntry],
  devtool: false,
  output: {
    path: paths.distPath,
    publicPath: '/',
    filename: 'js/[name].[contenthash].bundle.js',
    assetModuleFilename: 'public/[hash][ext][query]'
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
    new MiniCssExtractPlugin({
      filename: 'styles/[name].[contenthash].css',
      chunkFilename: '[id].css',
    })
  ],
  optimization: {
    minimize: true,
    minimizer: [new CssMinimizerPlugin(), '...'],
    runtimeChunk: {
      name: 'runtime',
    },
  },
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
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              importLoaders: 2,
              sourceMap: false,
              modules: false,
            },
          },
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