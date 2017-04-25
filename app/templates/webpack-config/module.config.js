const path = require('path');
const moduleConfig = {};
let ExtractTextPlugin = require('extract-text-webpack-plugin');
moduleConfig.rules = [];

moduleConfig.rules.push({
	enforce: "pre",
	test: /\.js$/,
	exclude: /node_modules|dll|lib/,
	loader: "eslint-loader",
});

moduleConfig.rules.push({
	test: /\.js$/,  
    exclude: /node_modules|dll|libs/,  
    loader: 'babel-loader' ,
    options: {
    	presets: [ ['es2015', {"loose": true}] ],
        cacheDirectory: true,
        plugins: ["transform-runtime"],
    }
});

moduleConfig.rules.push({
	test: /\.css$/,
    exclude: /dll/,
    loader: ExtractTextPlugin.extract({ fallback: 'style-loader', use: 'css-loader' })
});

moduleConfig.rules.push({
	test: /\.html$/,
	include: path.resolve(__dirname, '../app/'),
	loader: 'html-loader',
});

/*
moduleConfig.rules.push({
	test: /\.ejs$/,
	include: path.resolve(__dirname, '../app/'),
  	loader: 'ejs-loader'
});
*/


moduleConfig.rules.push({
	test: /\.(png|jpg|gif|jpeg)$/,
  	loader: 'url-loader',
	options: {
		limit: 8192,
	    name: 'images/[hash].[ext]',
	}
});

moduleConfig.rules.push({
	test: /\.(woff|woff2|svg|eot|ttf)\??.*$/,
	include: path.resolve(__dirname, '../'),
	loader: 'file-loader',
	options: {
		name: 'fonts/[name].[ext]',
	}
});
module.exports = moduleConfig;