## Introduction

In this project, we got the chance to build a responsive website. Cloning [The Next Web](https://thenextweb.com), a tech-focused magazine which uses media 
queries to gracefully degrade their site as the window size is reduced.

Our cloned website can be viewed [here](https://igakigongo.github.io/The-Next-Web/). Kindly note that only changes pushed to the
[master branch](https://github.com/igakigongo/The-Next-Web/tree/master) contribute towards the deployed site on github.io.

### Design Decisions
For each resolution we decided to save the files in a dedicated directory, why? In order to have the smaller screen devices load extremely 
small css files since we realized that some of the large display styles did not apply to the small devices.

With webpack it was possible for us to test out the theory of bundling styles per directory into one bundle, that way it's easier to
just load one file per resolution. 

```javascript
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
```
The above config file will emit a chunk named ***_576.[hash].css***, the hash is dynamic depending on whether the files have changed
since you last built with webpack.

The sample reference to the stylesheet would look as indicated below

```html
  <link rel="stylesheet" media="screen and (max-width: 575.98px)" href="./dist/_576.718afe60.css" />
```

The alternative without bundling would look like this

```html
  <link rel="stylesheet" media="screen and (max-width: 575.98px)" href="./assets/css/_576px/app.css" />
  <link rel="stylesheet" media="screen and (max-width: 575.98px)" href="./assets/css/_576px/cover-articles.css" />
  <link rel="stylesheet" media="screen and (max-width: 575.98px)" href="./assets/css/_576px/latest-news.css" />
  <link rel="stylesheet" media="screen and (max-width: 575.98px)" href="./assets/css/_576px/latest-deals.css" />
  <link rel="stylesheet" media="screen and (max-width: 575.98px)" href="./assets/css/_576px/latest-funding.css" />
  <link rel="stylesheet" media="screen and (max-width: 575.98px)" href="./assets/css/_576px/apps-gear-tech.css" />
  <link rel="stylesheet" media="screen and (max-width: 575.98px)" href="./assets/css/_576px/footer.css" />
```
