var gulp = require('gulp');
var connect = require('gulp-connect');
var proxy = require('http-proxy-middleware');
var htmlmin = require('gulp-htmlmin');
var cleancss = require('gulp-clean-css');
var autoprefixer = require('gulp-autoprefixer');
var imagemin = require('gulp-imagemin');
var jshint = require('gulp-jshint');
var cache = require('gulp-cached');
var uglify = require('gulp-uglify');
var spriter = require('gulp-css-spriter');
var pngquant = require('imagemin-pngquant');
var replace = require('gulp-replace');
var cheerio = require('gulp-cheerio');
var glob = require("glob");
var modifyCssUrls = require('gulp-modify-css-urls');
var sourcemaps = require('gulp-sourcemaps');
var minimist = require('minimist');
var gulpif = require('gulp-if');
var plumber = require('gulp-plumber');
var serverConfig = require('./server.config.js');

var knownOptions = {
    string: 'env',
    default: { env: process.env.NODE_ENV || 'dev' }
};

var options = minimist(process.argv.slice(2), knownOptions);

const xy = serverConfig.https ? 'https' : 'http';
const lj = xy + '://' + serverConfig.host + ':' + serverConfig.port + '/';

gulp.task('image',function(){
	gulp.src('./app/**/*.{png,jpg,gif,ico}')
		.pipe(cache(imagemin({
            progressive: true,
			svgoPlugins: [{removeViewBox: false}],
      		use: [pngquant()] 
        })))
		.pipe(gulp.dest('build'));
});
gulp.task('css', function() {
    gulp.src('./app/**/*.css')
        .pipe(plumber())
        .pipe(gulpif(options.env === 'dev', sourcemaps.init()))
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
        .pipe(gulpif(options.env === 'dev', sourcemaps.write('/')))
        .pipe(gulp.dest('build'));

});
gulp.task('script',function(){
	gulp.src('./app/**/*.js')
        .pipe(plumber())
        .pipe(gulpif(options.env === 'dev', sourcemaps.init()))
        .pipe(uglify())
        .pipe(gulpif(options.env === 'dev', sourcemaps.write('/')))
		.pipe(gulp.dest('build'));
});
gulp.task('html',function(){
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
    glob('./app/**/*.html', function (er, files) {

        for(var i = 0; i <files.length; i++){
            var paths = files[i].split('app');
            var path1 = paths[1].split('/');
            var newPath1 = '';
            for(var k = 0; k < path1.length - 1; k++){
                newPath1 += path1[k] + '/';
            }
            gulp.src(files[i])
                .pipe(plumber())
                .pipe(cheerio(function($,file){

                    $('script').each(function(){
                        var _this_src = $(this).attr('src');
                        if(_this_src){
                            if(_this_src.indexOf('node_modules') > -1){
                                var _src = _this_src.split('node_modules');
                                if(_src.length == 2){
                                    $(this).attr('src',lj + 'node_modules' + _src[_src.length-1]);
                                }
                                var _srcs = _this_src.split('/');
                                gulp.src('node_modules/**/'+ _srcs[_srcs.length-1])
                                    .pipe(gulpif(options.env === 'dev', sourcemaps.init()))
                                    .pipe(uglify())
                                    .pipe(gulpif(options.env === 'dev', sourcemaps.write('/')))
                                    .pipe(gulp.dest('build/node_modules'));

                            }else if(_this_src.indexOf('common') > -1){
                                var _src = _this_src.split('common');
                                if(_src.length == 2){
                                    $(this).attr('src',lj + 'common' + _src[_src.length-1]);
                                }
                            }

                        }
                    });

                    $('link').each(function(){
                        var _this_href = $(this).attr('href');
                        if(_this_href){
                            if(_this_href.indexOf('node_modules') > -1){

                                //添加绝对路径
                                var _href = _this_href.split('node_modules');
                                if(_href.length == 2){
                                    $(this).attr('href',lj + 'node_modules' + _href[_href.length-1]);
                                }

                                //将node_modules里面的css放入build
                                var _hrefs = _this_href.split('/');

                                //将css文件中的图片放入build
                                gulp.src('node_modules/**/'+ _hrefs[_hrefs.length-1])
                                    .pipe(gulpif(options.env === 'dev', sourcemaps.init()))
                                    .pipe(modifyCssUrls({
                                        modify: function (url, filePath) {

                                            var urlss = url.split('/');

                                            urlss_length = 0;
                                            for(var i = 0;i < urlss.length; i++){
                                                if(urlss[i] == '..'){
                                                    urlss_length++
                                                }
                                            }

                                            var filePathss = filePath.split('node_modules');

                                            var filePathss01 = filePathss[1].split('\\');
                                            var filePathfinal01 = '';

                                            for(var i = 0; i < filePathss01.length - urlss_length - 1; i++){
                                                filePathfinal01 += filePathss01[i] + '/';
                                            }

                                            for(var i = 0;i < urlss.length - 1; i++){
                                                if(urlss[i] != '..'){
                                                    filePathfinal01 += urlss[i] +'/';
                                                }
                                            }
                                            gulp.src('node_modules'+ filePathfinal01 + urlss[urlss.length - 1])
                                                .pipe(gulp.dest('build/node_modules'+ filePathfinal01));

                                            return lj + 'node_modules'+ filePathfinal01 + urlss[urlss.length - 1];
                                        }


                                    }))
                                    .pipe(gulpif(options.env === 'dev', sourcemaps.write('/')))
                                    .pipe(gulp.dest('build/node_modules'));


                            }else if(_this_href.indexOf('styles') > -1){
                                var _href = _this_href.split('styles');
                                if(_href.length == 2){
                                    $(this).attr('href',lj + 'styles' + _href[_href.length-1]);

                                }
                            }

                        }
                    });

                    $('img').each(function(){
                        var _this_src = $(this).attr('src');
                        if(_this_src){

                            var _src = _this_src.split('styles');
                            if(_src.length == 2){
                                $(this).attr('src',lj + 'styles' + _src[_src.length-1]);
                            }
                        }
                    });

                    if($('a').length > 0){
                        var base = file['base'].split('\\app\\');
                        $('a').each(function(){
                            var _this_href = $(this).attr('href').split('/');

                            var dian_length = 0;
                            for(var i = 0 ;i < _this_href.length ; i++){
                                if(_this_href[i] == '..'){
                                    dian_length++;
                                }
                            }
                            var baseUrl = base[1].split('\\');
                            var urls = '';
                            for(var i = 0; i < baseUrl.length - dian_length - 1; i++){
                                urls += baseUrl[i] + '/';
                            }
                            $(this).attr('href', lj + urls + _this_href[_this_href.length - 1]);
                        });
                    }
                }))
                .pipe(htmlmin(option))
                .pipe(gulp.dest(paths[0] +'build' + newPath1));
        }

    })

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
gulp.task('default',['image','css','script','serverBin','watch', 'html']);
gulp.task('build',['image','css','script','html']);