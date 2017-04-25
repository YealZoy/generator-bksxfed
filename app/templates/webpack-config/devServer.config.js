const path = require('path');
module.exports = {
	contentBase: path.resolve(__dirname, './build/'),
  	compress: true,
  	port: 9000,
  	hot:true,
  	inline: true,
  	host:'127.0.0.1',
  	proxy:{
  		"/api":{
  			target:"http://130.10.9.126:8080",
  			changeOrigin: true,
 			secure: false
  		}
  	}
};