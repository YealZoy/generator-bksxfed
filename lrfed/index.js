var Generator = require('yeoman-generator');
var yosay = require('yosay');
var chalk = require('chalk'); 
module.exports = class extends Generator{
	constructor(args, opts) {
	    super(args, opts);
	}
	initializing(){
		//初始化
		this.log(yosay('北控三兴web前端欢迎您！\n congratulations,\n you\'re going to bulid a webProject, \n the best wishes for you \n no bug!'));
		this.log(chalk.magenta('\n此框架开发模式和以前一样,加上了文件压缩\n'));
	}
	
	prompting(){
		//给用户展示选项提示
		var _this = this;
		var done = this.async();
		var prompts = [
			{
				type:'input',
				name:'appname',
				message:'请输入项目名称\n',
				default:this.appname
			},
			{
				type:'confirm',
				name:'nodeModule',
				message:'你是现在安装依赖包，还是稍后自己手动安装？\n',
			}
		];
		return this.prompt(prompts).then(function(answers){
			_this.answers = answers;
			done();
		});
	}
	configuring(){
		//保存用户配置项，同时配置工程
	}
	default(){

	}
	writing(){
		//用于生成和生成器相关的文件
		
		this.fs.copy(this.sourceRoot(),this.destinationRoot());

		//把package.json复制到项目中
		this.fs.copyTpl(
			this.templatePath('package.json'),
			this.destinationPath('package.json'),
			{appname:this.answers.appname}
		);

		//把gitignore复制到项目中
        this.fs.copyTpl(
            this.templatePath('.gitignore'),
            this.destinationPath('gitignore')
        );

        //把gitignore复制到项目中
        this.fs.copyTpl(
            this.templatePath('.gitlab-ci.yml'),
            this.destinationPath('.gitlab-ci.yml')
        );



	}
	conflicts(){
		//用于处理冲突异常
	}
	install(){
		if(this.answers.nodeModule){
			let _this = this;
			//用于安装相关库 (npm, bower)
			this.log(chalk.green('开始安装依赖包\n'));
			this.installDependencies({
				npm:false,
				bower:false,
				yarn:true,
				callback:function(){
					_this.log(chalk.green('包已经安装完成\n'));
				}
			});
		}
		
	}
	end(){
		//最后调用，常用于清理、道别等
		if(!this.answers.nodeModule){
			this.log(chalk.yellow('\n请不要忘记安装依赖包\n'));
		}	
		this.log('项目已创建完成！');
		
	}
}