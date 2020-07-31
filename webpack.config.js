const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
	entry: "./frontend/src/index.js",
	output: {
		filename: "main.js",
		chunkFilename: "vendor.js",
		path: path.join(__dirname, "./frontend/static/frontend")
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: "babel-loader"
			}
		]
	},
	optimization: {
		splitChunks: {
			cacheGroups: {
				vendor: {
					chunks: "initial",
					name: "vendor",
					test: "vendor",
					enforce: true
				}
			}
		},
		runtimeChunk: true
	}
};
