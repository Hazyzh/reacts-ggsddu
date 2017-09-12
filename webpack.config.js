const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: [
    'babel-polyfill',
    'react-hot-loader/patch',
    './src/index.js',
  ],
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  devtool: "source-map",
  plugins: [
    new HtmlWebpackPlugin({
        title: 'redux-middleware',
        template: path.resolve(__dirname, 'tmp.html'),
        inline: true,
        color: true,
    }),
  ],
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    compress: true,
    clientLogLevel: "warning",
    open: true,
    port: 9000,
  },
  module: {
    rules: [
      {
        test: /.jsx?$/,
        include: [path.resolve(__dirname, 'src')],
        exclude: [path.resolve(__dirname, 'node_modules')],
        loader: 'babel-loader'
      },
      {
        test: /.less$/,
        use: [
          'style-loader',
          'css-loader',
          'less-loader'
        ]
      }
    ]
  }
}
