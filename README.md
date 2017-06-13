
北控三兴信息技术有限公司web前端框架  

### 说明
本框架是北控三兴web前端框架，本框架可以生成2套代码，集成了bootstrap3.3.7,和jquery1.12.4,模版使用了artTemplate,其中libs文件下有generaltools.js,主要是对一些常用方法进行封装(包括请求,分页,验证)
+ 由webpack2.x构建的多页面应用
+ 是由gulp构建兼容ie8的多页面应用

### 安装
`npm install gulp yo generator-bksxfed -g`

### 使用webpack2.x构建步骤
+ 在要创建项目的目录下执行`yo bksxfed`,会生成相应的项目结构

```
├─app ---- 存放项目原文件
│  ├─css ---- 存放样式文件 
│  ├─dll ---- 存放常用的包文件和不修改的文件
│  │  └─fonts
│  ├─images ---- 存放项目图片
│  ├─pages ---- 存放项目页面
│  │  ├─mk1 ---- 模块文件  ---- 每个模块里面至少有个page.html和page.js
│  │  └─mk2 ---- 模块文件  ---- 每个模块里面至少有个page.html和page.js
│  ├─public ---- 存放项目的公共代码
│  └─script ---- 存放js文件
├─libs ---- 存放不用npm安装的第三方包
├─bin ---- 存放项目打包之后的文件
└─webpack-config ---- webpack配置文件
    └─base

```


+ 像以前的方式写代码,因为打包之后没有pages文件夹，在页面中有页面跳转的连接或js连接，css连接请注意。图片可以直接以开发文件地址写

+ 本框架集成了bootstrap和jquery，如果不喜欢这样的搭配方式，可以修改`otherLib.js`文件,然后执行`npm run dll`(只要修改了`otherLib.js`,请执行`npm run dll`),这个配置会生成相应的文件,那么引用相应资源时，请在页面采用连接的方式引用，就别使用require或import方式了

```javascript
//otherLib.js
module.exports = {
    dll:[
            'jquery',
            'bootstrapjs',
            'bootstrapcss',
            'paginationcss',
            'bootstrapfontEot',
            'bootstrapfontSvg',
            'bootstrapfontTtf',
            'bootstrapfontWof',
            'bootstrapfontWof2'
        ]

}
/**
 *说明：此文件导出的是一个对象，其中有dll属性，dll属性值是一个数组
 *执行npm run dll命令将jquery和bootstrap和分页插件的样式文件进行合并
 *otherLib.js主要将一些使用频率较高，不改动的文件进行合并，引用资源时在页面以链
 *接的形式引用，此目的是为了解决打包速度慢，打包文件过大
 *
*/
```

*注意：第三方包css禁止以require或import方式引用，js文件看你们方便,配置方法如下*
```javascript
//otherLib.js
module.exports = {
    dll:[
            'jquery',
            'bootstrapjs',
            'bootstrapcss',
            'paginationcss',
            'bootstrapfontEot',
            'bootstrapfontSvg',
            'bootstrapfontTtf',
            'bootstrapfontWof',
            'bootstrapfontWof2'
        ],
    other:[
        'xxx.css',
        'xxx.js'
    ]
}
```

修改`otherLib.js`后，执行`npm run dll`
执行命令之后会在dll文件夹下生成other.js和other.css  
如果要引用xxx.css或者xxx.js 页面代码如下

```html
<!DOCTYPE html>
<html>
<head>
    <title></title>
    <script type="text/javascript" src="/dll/other.js"></script>
    <link rel="stylesheet" type="text/css" href="/dll/other.css">
</head>
<body>
</body>
</html>
```

+ libsmap.js说明

```javascript
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
```

libsmap对象中可以配置属性名和值自己可搭配
如果你要引用jquery文件
```javascript
//正常引用是
var $ = require('~./node-module/jquery/dist/jquery.min.js')
```

如果你想这样写
```javascript
var $ = require('jquery')
```

在libsmap.js配置jquery的路径
其中nodeModule变量是你计算机的绝对路径到你项目的`node_modules`,其他的变量什么意思请自行想象，如果不明白请联系软件设计部前端人员

+ webpack-config/derServer.config.js说明

```javascript
const path = require('path');
module.exports = {
    contentBase: path.resolve(__dirname, './bin/'),
    compress: true,
    port: 9000,
    hot:true,
    inline: true,
    host:'127.0.0.1'
    proxy:{
        "/api":{
            target:"http://130.10.9.126:8080",
            changeOrigin: true,
            secure: false
        }
    }
};
```

此文件是服务配置
可修改`port`,`host`,`proxy`属性,其他选项禁止修改，如有修改发生问题请自行解决(美特斯邦威，不走寻常路，我敬你是条汉子)

proxy跨域可以跨多个

```javascript
const path = require('path');
module.exports = {
    contentBase: path.resolve(__dirname, './bin/'),
    compress: true,
    port: 9000,
    hot:true,
    inline: true,
    host:'127.0.0.1'
    proxy:{
        "/api":{
            target:"http://130.10.9.126:8080",
            changeOrigin: true,
            secure: false
        },
        "/other":{
            target:"http://130.10.9.127:8080",
            changeOrigin: true,
            secure: false
        }
    }
};
```

+ webpack-config/derServer.config.js说明
```javascript
module.exports = 'http://127.0.0.1:9000/';
```
*此文件特别注意,跟页面上的images地址和引用pages.js路径有关，配置出错会出现404的错误*
*发布生产环境时，请询问外网地址*



+ 代码编写完之后，执行`npm run build` 然后执行`npm run server`,访问项目地址,默认项目端口号是9000,可以在`webpack-config`文件夹下的`devServer.config.js`进行修改,本框架式热启动，修改文件之后刷新浏览器即可，不需重启服务，但是最后版本发布文件，请再次执行`npm run build`

+ 在开发项目中可以使用`yo bksxfed:page 参数`命令,此命令是生成模块文件，参数是文件夹的名字，执行命令之后会在app/pages文件下生成相应的文件夹目录结构，其中有两个文件`page.html`和`page.js`

`yo bksxfed:page mk3/cmk1`


会在项目app/pages 文件下生成mk3文件夹mk3文件包含cmk1文件夹cmk1文件下有`page.html`和`page.js`

`yo bksxfed:page mk3`



会在项目app/pages 文件下生成mk4文件夹 里面包含 `page.html`和`page.js`

如果要一些奇怪的文件夹结构请发觉上面两个例子的区别，如不明白请联系软件设计部人员

+ 在开发项目中可以使用`yo bksxfed:data 参数`命令，此命令是在相应文件下(page.js)生成请求代码

```javascript
$.ajax({
    url: '',
    type:'',
    data:'',
    success:function(){
    },
    error:function(jqXHR,textStatus,errorThrown){
    }
});
```

mk4文件夹下的page.js文件里面 会多出生成的代码

+ 执行`npm run analyse` 可以查看各个模块文件打包之前和打包之后的大小和gzip的大小

### 使用gulp构建步骤
+ 在要创建项目的目录下执行`yo bksxfed:ie8`,会生成相应的项目结构
+ 然后正常开发

### 暂时使用
+ 在要创建项目的目录下执行`yo bksxfed:lrfed`,会生成相应的项目结构
+ 然后正常开发

# 查看版本
`bksxfed -V`(v大写)
或者
`bksxfed --vesrion`
返回本地版本




