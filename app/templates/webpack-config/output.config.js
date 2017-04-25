const path = require('path');
module.exports = {
	path:path.resolve(__dirname,'../build/'),
	publicPath:require('../publicPath.config.js'),
	filename:'[name]/entry.js',
	chunkFilename:'[id].bundle.js'
}