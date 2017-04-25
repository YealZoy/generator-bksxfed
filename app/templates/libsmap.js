var path = require('path');
var nodeModules = path.resolve(process.cwd(),'./node_modules');
var css = path.resolve(process.cwd(),'./app/css/');
var script = path.resolve(process.cwd(),'./app/script/');
var images = path.resolve(process.cwd(),'./app/images/');
var libs = path.resolve(process.cwd(),'./libs/');
const libsmap = {
	css:css,
	script:script,
	images:images,
	libs:libs,
	jquery:path.resolve(nodeModules,'./jquery/dist/jquery.min.js'),
	bootstrapcss:path.resolve(nodeModules,'./bootstrap/dist/css/bootstrap.min.css'),
	bootstrapjs:path.resolve(nodeModules,'./bootstrap/dist/js/bootstrap.min.js'),
	bootstrapfontEot:path.resolve(nodeModules,'./bootstrap/dist/fonts/glyphicons-halflings-regular.eot'),
	bootstrapfontSvg:path.resolve(nodeModules,'./bootstrap/dist/fonts/glyphicons-halflings-regular.svg'),
	bootstrapfontTtf:path.resolve(nodeModules,'./bootstrap/dist/fonts/glyphicons-halflings-regular.ttf'),
	bootstrapfontWof:path.resolve(nodeModules,'./bootstrap/dist/fonts/glyphicons-halflings-regular.woff'),
	bootstrapfontWof2:path.resolve(nodeModules,'./bootstrap/dist/fonts/glyphicons-halflings-regular.woff2'),
	template:path.resolve(nodeModules,'./art-template/dist/template-native.js'),
	paginationjs:path.resolve(nodeModules,'./paginationjs/dist/pagination.min.js'),
	paginationcss:path.resolve(nodeModules,'./paginationjs/dist/pagination.css'),
}
module.exports = libsmap;