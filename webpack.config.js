/* eslint-env node */
const { reject, isNil } = require('ramda');
const webpack = require('webpack');
const path = require('path');
const context = path.resolve(__dirname, 'src/client');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const isProduction = process.env.NODE_ENV === 'production';
const isDevelopment = !isProduction;

const htmlPluginConfig = new HtmlWebpackPlugin({
  template: './boot/index.html',
  filename: 'index.html',
  inject: 'body'
});

const definePluginConfig = new webpack.DefinePlugin({
  'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
})


const uglifyPluginConfig = new webpack.optimize.UglifyJsPlugin();

const hotModuleReplacementPluginConfig = new webpack.HotModuleReplacementPlugin();

const namedModulesPluginConfig = new webpack.NamedModulesPlugin();

const distFolder = path.join(__dirname, './dist');

module.exports = {
    ...(isDevelopment ? { devtool: 'source-map' } : {}),
    context,
    entry: reject(isNil)([
      isDevelopment ? 'webpack-hot-middleware/client' : undefined,
      './boot/index.js',
    ]),
    output: {
       path: distFolder,
       publicPath: '/',
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
    plugins: reject(isNil)([
      htmlPluginConfig,
      definePluginConfig,
      new webpack.optimize.ModuleConcatenationPlugin(),
      isDevelopment ? namedModulesPluginConfig : undefined,
      isDevelopment ? hotModuleReplacementPluginConfig : undefined,
      isDevelopment ? new webpack.NoEmitOnErrorsPlugin() : undefined,
      isProduction ? uglifyPluginConfig : undefined,
    ])
 };
