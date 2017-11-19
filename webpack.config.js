/* eslint-env node */
const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
  template: './src/boot/index.html',
  filename: 'index.html',
  inject: 'body'
});
module.exports = {
    entry: './src/boot/index.js',
    output: {
       path: path.join(__dirname, './dist'),
       filename: 'app.bundle.js',
    },
    resolve: {
      modules: ['src', 'node_modules']
    },
    module: {
      loaders: [
        { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ },
        { test: /\.jsx$/, loader: 'babel-loader', exclude: /node_modules/ }
      ]
    },
    plugins: [HtmlWebpackPluginConfig]
 };
