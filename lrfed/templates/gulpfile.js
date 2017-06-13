var gulp = require('gulp');
var connect = require('gulp-connect');
var proxy = require('http-proxy-middleware');
var htmlmin = require('gulp-htmlmin');
var cleancss = require('gulp-clean-css');
var autoprefixer = require('gulp-autoprefixer');
var imagemin = require('gulp-imagemin');
var uglify = require('gulp-uglify');
var cache = require('gulp-cached');
var concat = require('gulp-concat');
var flatten = require('gulp-flatten'); 
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
    gulp.src('./app/**/*.css')
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
gulp.task('script',function(){
	gulp.src('app/**/*.js')
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
gulp.task('default',['image','css','html','script','serverBin','watch']);
//gulp.task('default',['cheerio']);