module.exports = {
	devtool:"#source-map",
	entry:require('./webpack-config/entry.config.js'),
	output:require('./webpack-config/output.config.js'),
	resolve:require('./webpack-config/resolve.config.js'),
	module:require('./webpack-config/module.config.js'),
	plugins:require('./webpack-config/plugins.config.js'),
	devServer:require('./webpack-config/devServer.config.js')
}

