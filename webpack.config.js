const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const project = process.argv[2]

module.exports = {
	entry: [
		'babel-polyfill',
		'react-hot-loader/patch',
		'antd/dist/antd.less',
		path.resolve(__dirname, project)
	],
	output: {
		filename: 'bundle.js',
		path: path.resolve(__dirname, 'dist')
	},
	devtool: "source-map",
	plugins: [
		new HtmlWebpackPlugin({
			title: 'reacts-ggsddu',
			template: path.resolve(__dirname, 'tmp.html'),
			favicon: './favicon.ico'
		})
	],
	devServer: {
		contentBase: path.join(__dirname, "dist"),
		compress: true,
		clientLogLevel: "warning",
		open: true,
		port: 9000,
		proxy: {
			"/": {
				target: "http://localhost:8088",
				pathRewrite: {'^/api' : '/'}
			}
		}
	},
	module: {
		rules: [
			{
				test: /.jsx?$/,
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
	},

}
