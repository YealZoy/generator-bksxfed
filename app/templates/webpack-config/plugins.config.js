const webpack = require('webpack');
const path = require('path');
let pagesArr = require('./base/page-entries.config.js');
let ExtractTextPlugin = require('extract-text-webpack-plugin');
let HtmlWebpackPlugin = require('html-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');
const pages = path.resolve(__dirname, '../app/pages');
let pluginsConfig = [];

function postcss() {
	var precss = require('precss');
	var autoprefixer = require('autoprefixer');
  	return [precss, autoprefixer({
    	remove: false,
    	browsers: ['ie >= 8', '> 1% in CN'],
  	})];
};


function esLintPlugin(){
	return {
		configFile: path.resolve(__dirname,'../.eslintrc'),
	  	failOnWarning: true,
	  	failOnError: true,
	  	cache: true,
	};
}

pluginsConfig.push(new HtmlWebpackPlugin({
	filename:'index.html',
	template: path.resolve(__dirname,'../app/index.html'),
	chunks:[],
	hash: true,
	xhtml: true
}));

pagesArr.forEach((page) => {
	const htmlPlugin = new HtmlWebpackPlugin({
		filename: `${page}/page.html`,
		template: path.resolve(pages,`./${page}/page.html`),
		chunks: [page, 'commons/js'],
	    hash: true,
	    xhtml: true
	});
  	pluginsConfig.push(htmlPlugin);
});



pluginsConfig.push(new webpack.ProvidePlugin({
	$: 'jquery',
    jQuery: 'jquery',
    'window.jQuery': 'jquery',
    'window.$': 'jquery'
}));


pluginsConfig.push(new ExtractTextPlugin("commons/css/bundle.css"));

pluginsConfig.push(new webpack.optimize.CommonsChunkPlugin({
    name: 'commons/js', 
    filename: '[name]/bundle.js',
    minChunks: 4,
}));

pluginsConfig.push(new webpack.LoaderOptionsPlugin({
	options: {
    	postcss: postcss,
    	eslint: esLintPlugin()
  	}
}));
pluginsConfig.push(new webpack.HotModuleReplacementPlugin());

pluginsConfig.push(new webpack.DllReferencePlugin({
	context: __dirname,
   	manifest: path.resolve(__dirname,'../app/dll/manifest.json'),
}));

pluginsConfig.push(new CopyWebpackPlugin([
	{
		from:path.resolve(__dirname,'../app/dll'),
		to:path.resolve(__dirname,'../build/dll')
	}
]));

module.exports = pluginsConfig;