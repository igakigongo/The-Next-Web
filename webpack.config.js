const path = require('path');
const FixStyleOnlyEntriesPlugin = require("webpack-fix-style-only-entries");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = {
	entry: {
		_576: ["./assets/css/_576px/app.css",
			"./assets/css/_576px/apps-gear-tech.css",
			"./assets/css/_576px/cover-articles.css",
			"./assets/css/_576px/footer.css",
			"./assets/css/_576px/latest-deals.css",
			"./assets/css/_576px/latest-funding.css",
			"./assets/css/_576px/latest-news.css"
		]
	},

	module: {
		rules: [{
			test: /\.css$/,
			use: [MiniCssExtractPlugin.loader, 'css-loader'],
		}],
	},

	optimization: {
		minimizer: [new OptimizeCSSAssetsPlugin({})],
	},

	plugins: [
		new FixStyleOnlyEntriesPlugin(),
		new MiniCssExtractPlugin({
			filename: "[name].[chunkhash:8].css"
		})
	]
};