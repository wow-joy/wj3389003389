const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  mode: 'development',
  devtool: 'source-map',
  entry: './src/index.tsx',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /.tsx?$/,
        exclude: /node_modules/,
        use: [{ loader: 'ts-loader' }],
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
    mainFields: ['dev', 'browser', 'module', 'main'],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: 'icon-demo',
      template: './public/index.html',
    }),
  ],
  devServer: {
    port: 9000,
    host: '0.0.0.0',
  },
};
