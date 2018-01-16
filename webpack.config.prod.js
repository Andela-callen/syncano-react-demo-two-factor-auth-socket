const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const Dotenv = require('dotenv-webpack');

const PATHS = {
  app: path.join(__dirname, './client/src'),
  build: path.join(__dirname, './client/production')
};

module.exports = {
  context: PATHS.app,
  entry: {
    app: './index.jsx'
  },
  output: {
    path: PATHS.build,
    filename: 'bundle.js',
    pathinfo: true
  },
  resolve: {
    extensions: ['*', '.js', '.jsx']
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new ExtractTextPlugin('styles.css'),
    new Dotenv({
      path: './.env'
    })
  ],
  module: {
    loaders: [
      {
        query: {
          cacheDirectory: true,
        },
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      }, {
        test: /\.(scss|css)?$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'resolve-url-loader', 'sass-loader?sourceMap']
        })
      }, {
        test: /\.(ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'file-loader'
      }, {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'url-loader?limit=10000&mimetype=application/font-woff'
      }, {
        test: /\.(png|jpg|gif)$/,
        loader: 'url-loader?limit=250000'
      }
    ]
  },
  externals: {
    jquery: 'jquery'
  }
};
