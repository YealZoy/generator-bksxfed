var Generator = require('yeoman-generator');
const content = 
`
$.ajax({
	url: '',
	type:'',
	data:'',
	success:function(){
	},
	error:function(jqXHR,textStatus,errorThrown){
	}
});
`
module.exports = class extends Generator{
	constructor(args, opts) {
	    super(args, opts);
	    this.argument('pagename', { type: String, required: true });
	    this.pagename = this.options.pagename;
	}
	initializing(){
		this.fs.append(this.destinationPath('app/pages/' + this.pagename + '/page.js'), content)
	}
}