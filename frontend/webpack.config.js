const path = require('path');
const webpack = require('webpack');
const packageJson = require('./package.json');
const resolve = require('path').resolve;


module.exports = (env) => {
  const settings = {
    entry: './src/app.js',
    devtool: 'source-map',
    mode: 'development',
    plugins: [new webpack.EnvironmentPlugin(['MapboxAccessToken'])],
    resolve: {
      modules: ['node_modules'],
      alias: {
      // From mapbox-gl-js README. Required for non-browserify bundlers (e.g. webpack):
      'mapbox-gl$': resolve('./node_modules/mapbox-gl/dist/mapbox-gl.js')
    },
    extensions: ['.ts', '.js']
  },
  module: {
    rules: [
      {
      test: /\.tsx?$/,
      use: {
        loader: 'ts-loader',
      },
      exclude: /node_modules/,
    },
    // {
    //   test: /\.js?$/,
    //   use: 'js-loader',
    //   exclude: /node_modules/,
    // },
    {
      test: /\.(png|svg)$/,
      use: [{
        loader: 'url-loader',
        options: {},
      }],
    }, {
      test: /\.css$/,
      use: ['style-loader', 'css-loader'],
    },
  ],
},
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist')
  }


  }
  return settings;
}
