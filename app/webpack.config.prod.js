const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserWeppackPlugin = require('terser-webpack-plugin');
const merge = require('webpack-merge');
const base = require('./webpack.config.base');
const dotenv = require('dotenv-webpack');

module.exports = merge(base, {
  mode: 'production',
  output: {
    filename: 'static/js/main.js',
    chunkFilename: 'static/js/[name].chunk.js',
    path: path.resolve(__dirname, 'build'),
  },
  module: {
    rules: [
      {
        // sass/scss loader to load sass-scss style files
        test: /\.(sass|scss)$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'sass-loader',
            options: {
              prependData: `$prefix: 'https://cdn.jsdelivr.net/gh/dominik2323/pars-shop@latest/app/public';`,
            },
          },
        ],
      },
      {
        // copies image files to assets folder in destination folder - build
        test: /\.(svg|png|jpg|jpeg|ico)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[hash:8].[ext]',
              outputPath: 'static/assets',
              publicPath: 'static/assets',
            },
          },
        ],
      },
    ],
  },
  optimization: {
    minimizer: [
      new TerserWeppackPlugin({
        terserOptions: {
          parse: {
            ecma: 8,
          },
          compress: {
            ecma: 5,
            warnings: false,
            comparisons: false,
            inline: 2,
          },
          mangle: {
            safari10: true,
          },
          output: {
            ecma: 5,
            comments: false,
            ascii_only: true,
          },
        },
        parallel: true,
        cache: true,
        sourceMap: true,
      }),
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'public', 'index.html'),
      // favicon: path.resolve(__dirname, 'public', 'favicon.ico'),
    }),
    new MiniCssExtractPlugin({
      filename: 'static/css/[name].css',
    }),
    new dotenv()
  ],
});
