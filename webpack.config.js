/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
'use strict';

const path = require('path');

module.exports = {
  // generate source map
  devtool: 'source-map',

  // bundling mode
  mode: 'production',

  // entry files
  entry: path.resolve(__dirname, './src/index.ts'),

  // output bundles (location)
  output: {
    path: path.resolve(__dirname, './dist/bundle'),
    filename: 'bundle.js',
  },

  // file resolutions
  resolve: {
    extensions: [
      '.js',
      '.ts',
      '.tsx'
    ],
  },

  // loaders
  module: {
    rules: [
      {
        test: /\.(js|jsx|tsx|ts)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              '@babel/preset-env',
              "@babel/preset-typescript"
            ]
          }
        }
      }
    ],
  }
};
