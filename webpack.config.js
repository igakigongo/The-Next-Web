const glob = require('glob');
const FixStyleOnlyEntriesPlugin = require("webpack-fix-style-only-entries");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = {
	entry: {
		_576: glob.sync('./assets/css/_576px/*.css')
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