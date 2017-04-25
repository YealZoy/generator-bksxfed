var gulp = require('gulp');
var connect = require('gulp-connect');
var proxy = require('http-proxy-middleware');
var htmlmin = require('gulp-htmlmin');
var changed = require('gulp-changed');
var cleancss = require('gulp-clean-css');
var autoprefixer = require('gulp-autoprefixer');
var imagemin = require('gulp-imagemin');
var uglify = require('gulp-uglify');
var jshint = require('gulp-jshint');
var cache = require('gulp-cached');
var concat = require('gulp-concat');
var flatten = require('gulp-flatten'); 
var spriter = require('gulp-css-spriter');
var pngquant = require('imagemin-pngquant');
var replace = require('gulp-replace');
var cheerio = require('gulp-cheerio');
var serverConfig = require('./server.config.js');

const xy = serverConfig.https ? 'https' : 'http';
const lj = xy + '://' + serverConfig.host + ':' + serverConfig.port + '/';

gulp.task('image',function(){
	gulp.src('app/**/*.{png,jpg,gif,ico}')
		.pipe(cache(imagemin({
            progressive: true,
			svgoPlugins: [{removeViewBox: false}],
      		use: [pngquant()] 
        })))
		.pipe(gulp.dest('build'));
});
gulp.task('css', function() {
	gulp.src('app/**/*.html')
    	.pipe(cheerio(function($){
    		$('link').each(function(){
    			var _this_src = $(this).attr('href');
    			if(_this_src){
    				if(_this_src.indexOf('node_modules') > -1){
    					var _src = _this_src.split('/');
    					gulp.src('node_modules/**/'+ _src[_src.length-1])
    						.pipe(cleancss({
					            advanced: false,
					            compatibility: 'ie7',
					            keepBreaks: true,
					            keepSpecialComments: '*'
					        }))
							.pipe(gulp.dest('build/node_modules'));
    				}
    			}   			
    		});
	    }));
	gulp.src('lib/**/*.css')
		.pipe(autoprefixer())
		.pipe(cleancss({
            advanced: false,
            compatibility: 'ie7',
            keepBreaks: true,
            keepSpecialComments: '*'
        }))
		.pipe(gulp.dest('build/lib'));

    gulp.src('./app/**/*.css')
        .pipe(spriter({
            'spriteSheet': './build/images/spritesheet.png',
            'pathToSpriteSheetFromCSS': '../images/spritesheet.png' 
        }))
        .pipe(autoprefixer())
		.pipe(replace(/(\.\.\/)+/g,lj))
		.pipe(cleancss({
            advanced: false,
            compatibility: 'ie7',
            keepBreaks: true,
            keepSpecialComments: '*'
        }))
        .pipe(gulp.dest('build'));
});
gulp.task('fonts',function(){
	gulp.src('lib/fonts/**')
		.pipe(flatten())
		.pipe(gulp.dest('build/lib/fonts'));
});
gulp.task('script',function(){
	gulp.src('app/**/*.html')
    	.pipe(cheerio(function($){
    		$('script').each(function(){
    			var _this_src = $(this).attr('src');
    			if(_this_src){
    				if(_this_src.indexOf('node_modules') > -1){
    					var _src = _this_src.split('/');
    					gulp.src('node_modules/**/'+ _src[_src.length-1])
    						.pipe(uglify())
							.pipe(gulp.dest('build/node_modules'));
    				}
    			}   			
    		});
	    }));

	gulp.src('lib/**/*.js')
		.pipe(uglify())
		.pipe(gulp.dest('build/lib'));

	gulp.src('app/**/*.js')
		.pipe(jshint('.jshintrc'))
    	.pipe(jshint.reporter('default'))
		.pipe(uglify())
		.pipe(gulp.dest('build'));
});
gulp.task('html', function() {
	var option = {
		removeComments: true,
        collapseWhitespace: true,
        collapseBooleanAttributes: true,
        removeEmptyAttributes: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true,
        minifyJS: true,
        minifyCSS: true
	}
    gulp.src('app/**/*.html')
		.pipe(replace(/(\.\.\/)+/g,lj))
		.pipe(htmlmin(option))
		.pipe(gulp.dest('build'));              
});
gulp.task('serverBin',function(){
	connect.server(serverConfig);
	 
});
gulp.task('watch',function(){
	gulp.watch('app/**/*.html',['html']);
	gulp.watch('app/**/*.css',['css']);
	gulp.watch('app/**/*.{png,jpg,gif,svg}',['image']);
	gulp.watch('app/**/*.js',['script']);
	 
});
gulp.task('default',['image','css','html','fonts','script','serverBin','watch']);
//gulp.task('default',['cheerio']);