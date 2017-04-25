var Generator = require('yeoman-generator');
module.exports = class extends Generator{
	constructor(args, opts) {
	    super(args, opts);
	    this.argument('pagename', { type: String, required: true });
	    this.pagename = this.options.pagename;
	}
	initializing(){
		this.fs.copyTpl(
			this.templatePath('page.html'),
			this.destinationPath('app/pages/' + this.pagename + '/page.html')
		);

		this.fs.copyTpl(
			this.templatePath('page.js'),
			this.destinationPath('app/pages/' + this.pagename + '/page.js')
		);
	}
	
}