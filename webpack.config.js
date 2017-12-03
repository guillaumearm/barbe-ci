/* eslint-env node */
const path = require('path');
const context = path.resolve(__dirname, 'src/client');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
  template: './boot/index.html',
  filename: 'index.html',
  inject: 'body'
});

module.exports = {
    context,
    entry: './boot/index.js',
    output: {
       path: path.join(__dirname, './dist'),
       filename: 'app.bundle.js',
    },
    resolve: {
      modules: ['src/client', 'node_modules']
    },
    module: {
      loaders: [
        { test: /\.jsx?$/, loader: 'babel-loader', exclude: /node_modules/ },
        {
          include: context,
          loaders: [
            'style-loader',
            'css-loader?importLoader=1&modules&localIdentName=[path]___[name]__[local]___[hash:base64:5]'
          ],
          test: /\.css$/
        },
      ]
    },
    plugins: [HtmlWebpackPluginConfig]
 };
