var webpack = require('webpack');

module.exports = {
  entry: {
    "puzzle-reader": "./src/puzzle-reader.js"
  },
  output: {
    path: 'build',
    filename: '[name].js',
    library: 'PuzzleReader',
    libraryTarget: 'umd'
  },
  externals: [
    "marked",
    "react"
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader'
      }
    ]
  },
  devtool: "source-map",
  plugins: [new webpack.optimize.UglifyJsPlugin({
      include: /\.min\.js$/,
      compress: {
        warnings: false
      },
      output: {
        comments: false
      }
    })]
};
