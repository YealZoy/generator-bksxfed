/*!art-template - Template Engine | http://aui.github.com/artTemplate/*/
!function(){function a(a){return a.replace(t,"").replace(u,",").replace(v,"").replace(w,"").replace(x,"").split(y)}function b(a){return"'"+a.replace(/('|\\)/g,"\\$1").replace(/\r/g,"\\r").replace(/\n/g,"\\n")+"'"}function c(c,d){function e(a){return m+=a.split(/\n/).length-1,k&&(a=a.replace(/\s+/g," ").replace(/<!--[\w\W]*?-->/g,"")),a&&(a=s[1]+b(a)+s[2]+"\n"),a}function f(b){var c=m;if(j?b=j(b,d):g&&(b=b.replace(/\n/g,function(){return m++,"$line="+m+";"})),0===b.indexOf("=")){var e=l&&!/^=[=#]/.test(b);if(b=b.replace(/^=[=#]?|[\s;]*$/g,""),e){var f=b.replace(/\s*\([^\)]+\)/,"");n[f]||/^(include|print)$/.test(f)||(b="$escape("+b+")")}else b="$string("+b+")";b=s[1]+b+s[2]}return g&&(b="$line="+c+";"+b),r(a(b),function(a){if(a&&!p[a]){var b;b="print"===a?u:"include"===a?v:n[a]?"$utils."+a:o[a]?"$helpers."+a:"$data."+a,w+=a+"="+b+",",p[a]=!0}}),b+"\n"}var g=d.debug,h=d.openTag,i=d.closeTag,j=d.parser,k=d.compress,l=d.escape,m=1,p={$data:1,$filename:1,$utils:1,$helpers:1,$out:1,$line:1},q="".trim,s=q?["$out='';","$out+=",";","$out"]:["$out=[];","$out.push(",");","$out.join('')"],t=q?"$out+=text;return $out;":"$out.push(text);",u="function(){var text=''.concat.apply('',arguments);"+t+"}",v="function(filename,data){data=data||$data;var text=$utils.$include(filename,data,$filename);"+t+"}",w="'use strict';var $utils=this,$helpers=$utils.$helpers,"+(g?"$line=0,":""),x=s[0],y="return new String("+s[3]+");";r(c.split(h),function(a){a=a.split(i);var b=a[0],c=a[1];1===a.length?x+=e(b):(x+=f(b),c&&(x+=e(c)))});var z=w+x+y;g&&(z="try{"+z+"}catch(e){throw {filename:$filename,name:'Render Error',message:e.message,line:$line,source:"+b(c)+".split(/\\n/)[$line-1].replace(/^\\s+/,'')};}");try{var A=new Function("$data","$filename",z);return A.prototype=n,A}catch(B){throw B.temp="function anonymous($data,$filename) {"+z+"}",B}}var d=function(a,b){return"string"==typeof b?q(b,{filename:a}):g(a,b)};d.version="3.0.0",d.config=function(a,b){e[a]=b};var e=d.defaults={openTag:"<%",closeTag:"%>",escape:!0,cache:!0,compress:!1,parser:null},f=d.cache={};d.render=function(a,b){return q(a,b)};var g=d.renderFile=function(a,b){var c=d.get(a)||p({filename:a,name:"Render Error",message:"Template not found"});return b?c(b):c};d.get=function(a){var b;if(f[a])b=f[a];else if("object"==typeof document){var c=document.getElementById(a);if(c){var d=(c.value||c.innerHTML).replace(/^\s*|\s*$/g,"");b=q(d,{filename:a})}}return b};var h=function(a,b){return"string"!=typeof a&&(b=typeof a,"number"===b?a+="":a="function"===b?h(a.call(a)):""),a},i={"<":"&#60;",">":"&#62;",'"':"&#34;","'":"&#39;","&":"&#38;"},j=function(a){return i[a]},k=function(a){return h(a).replace(/&(?![\w#]+;)|[<>"']/g,j)},l=Array.isArray||function(a){return"[object Array]"==={}.toString.call(a)},m=function(a,b){var c,d;if(l(a))for(c=0,d=a.length;d>c;c++)b.call(a,a[c],c,a);else for(c in a)b.call(a,a[c],c)},n=d.utils={$helpers:{},$include:g,$string:h,$escape:k,$each:m};d.helper=function(a,b){o[a]=b};var o=d.helpers=n.$helpers;d.onerror=function(a){var b="Template Error\n\n";for(var c in a)b+="<"+c+">\n"+a[c]+"\n\n";"object"==typeof console&&console.error(b)};var p=function(a){return d.onerror(a),function(){return"{Template Error}"}},q=d.compile=function(a,b){function d(c){try{return new i(c,h)+""}catch(d){return b.debug?p(d)():(b.debug=!0,q(a,b)(c))}}b=b||{};for(var g in e)void 0===b[g]&&(b[g]=e[g]);var h=b.filename;try{var i=c(a,b)}catch(j){return j.filename=h||"anonymous",j.name="Syntax Error",p(j)}return d.prototype=i.prototype,d.toString=function(){return i.toString()},h&&b.cache&&(f[h]=d),d},r=n.$each,s="break,case,catch,continue,debugger,default,delete,do,else,false,finally,for,function,if,in,instanceof,new,null,return,switch,this,throw,true,try,typeof,var,void,while,with,abstract,boolean,byte,char,class,const,double,enum,export,extends,final,float,goto,implements,import,int,interface,long,native,package,private,protected,public,short,static,super,synchronized,throws,transient,volatile,arguments,let,yield,undefined",t=/\/\*[\w\W]*?\*\/|\/\/[^\n]*\n|\/\/[^\n]*$|"(?:[^"\\]|\\[\w\W])*"|'(?:[^'\\]|\\[\w\W])*'|\s*\.\s*[$\w\.]+/g,u=/[^\w$]+/g,v=new RegExp(["\\b"+s.replace(/,/g,"\\b|\\b")+"\\b"].join("|"),"g"),w=/^\d[^,]*|,\d[^,]*/g,x=/^,+|,+$/g,y=/^$|,+/;"function"==typeof define?define(function(){return d}):"undefined"!=typeof exports?module.exports=d:this.template=d}();
/*
 * pagination.js 2.0.8
 * A jQuery plugin to provide simple yet fully customisable pagination.
 * https://github.com/superRaytin/paginationjs
 *
 * Homepage: http://pagination.js.org
 *
 * Copyright 2014-2100, superRaytin
 * Released under the MIT license.
 */

(function(global, $) {
  //请求
  if(sessionStorage.getItem('id_token')){
      $.ajaxSetup({
          headers: {         
            'Authorization':'Bearer ' +  sessionStorage.getItem('id_token')
          }
      });
    }
    var _ajax = $.ajax;
    $.ajax = function(opt){
      var temp = opt.temp;
      var fn = {
        error:function(jqXHR,textStatus,errorThrown){},
        success:function(data,textStatus,jqXHR){}
      }
      if(opt.error){
        fn.error = opt.error; 
      }

      if(opt.success){
        fn.success = opt.success;
      }

    
      if(typeof opt.data === 'object'){
        opt.data = JSON.stringify(opt.data);
      }
      
      var _opt = $.extend(opt,{
        contentType:'application/json;charset=UTF-8',
        error:function(jqXHR,textStatus,errorThrown){
            var ret = fn.error(jqXHR,textStatus,errorThrown);
            if(ret == undefined || ret == true){
                if(jqXHR.status == 'undefined'){
                  return;
                }
                alert(jqXHR.responseText);
            } 
          },
          success:function(data,textStatus,jqXHR){
            if(data){
                if(data.id_token){
                  sessionStorage.setItem('id_token',data.id_token);
                  $.ajaxSetup({
                      headers: {         
                        'Authorization':'Bearer ' +  sessionStorage.getItem('id_token')
                      }
                  });
                }
                if(temp){

                  var list = {
                                data : data
                              }
                  var temp_child = $(temp).children('script');
                  var $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';
                  var maxPos = $chars.length; 
                  var randomId = '';
                  for (i = 0; i < 6; i++) {  
                      randomId += $chars.charAt(Math.floor(Math.random() * maxPos));  
                  }
                  temp_child.attr('id',randomId);
                  $(temp).html(template(randomId,list));
                }
            }
            fn.success(data,textStatus,jqXHR); 
          }
      });
      return _ajax(_opt);
    }
    //分页
    $.fn.pageTool = function(obj){
      var url = obj.url;
      var pageSize = obj.pageSize || 10;
      var callBack = obj.callback;
      var _this = $(this);
      var name = _this.attr('id');
      var $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';
      var maxPos = $chars.length; 
      var randomId = '';
      for (i = 0; i < 6; i++) {  
          randomId += $chars.charAt(Math.floor(Math.random() * maxPos));  
      }

      var container = $('#pagination-' + name);
      var options = {
            dataSource: function(done){
              $.ajax({
                  type: 'GET',
                  url: url,
                  success: function(data,textStatus,jqXHR){
                    done(data);
                  },
                  error:function(jqXHR,textStatus,errorThrown){
                    alert(jqXHR.responseText);
                  }
              });
            },
            pageSize: pageSize,
            showGoInput: true,
            showGoButton: true,
            callback: function (response, pagination) {
              _this.children('script').attr('id',randomId);                 
              var list = {
                  data : response
              }
              _this.html(template(randomId,list));
              if(callBack){
                  callBack();
              }
            }
        };

        container.pagination(options);
    }

  if (typeof $ === 'undefined') {
    throwError('Pagination requires jQuery.');
  }

  var pluginName = 'pagination';

  var pluginHookMethod = 'addHook';

  var eventPrefix = '__pagination-';

  // Conflict, use backup
  if ($.fn.pagination) {
    pluginName = 'pagination2';
  }

  $.fn[pluginName] = function(options) {

    if (typeof options === 'undefined') {
      return this;
    }

    var container = $(this);

    var pagination = {

      initialize: function() {
        var self = this;

        // Save attributes of current instance
        if (!container.data('pagination')) {
          container.data('pagination', {});
        }

        // Before initialize
        if (self.callHook('beforeInit') === false) return;

        // If pagination has been initialized, destroy it
        if (container.data('pagination').initialized) {
          $('.paginationjs', container).remove();
        }

        // Whether to disable Pagination at the initialization
        self.disabled = !!attributes.disabled;

        // Passed to the callback function
        var model = self.model = {
          pageRange: attributes.pageRange,
          pageSize: attributes.pageSize
        };

        // "dataSource"`s type is unknown, parse it to find true data
        self.parseDataSource(attributes.dataSource, function(dataSource) {

          // Whether pagination is sync mode
          self.sync = Helpers.isArray(dataSource);
          if (self.sync) {
            model.totalNumber = attributes.totalNumber = dataSource.length;
          }

          // Obtain the total number of pages
          model.totalPage = self.getTotalPage();

          // Less than one page
          if (attributes.hideWhenLessThanOnePage) {
            if (model.totalPage <= 1) return;
          }

          var el = self.render(true);

          // Extra className
          if (attributes.className) {
            el.addClass(attributes.className);
          }

          model.el = el;

          // Load template
          container[attributes.position === 'bottom' ? 'append' : 'prepend'](el);

          // Binding events
          self.observer();

          // initialized flag
          container.data('pagination').initialized = true;

          // After initialized
          self.callHook('afterInit', el);
        });
      },

      render: function(isBoot) {
        var self = this;
        var model = self.model;
        var el = model.el || $('<div class="paginationjs"></div>');
        var isForced = isBoot !== true;

        // Before render
        self.callHook('beforeRender', isForced);

        var currentPage = model.pageNumber || attributes.pageNumber;
        var pageRange = attributes.pageRange;
        var totalPage = model.totalPage;

        var rangeStart = currentPage - pageRange;
        var rangeEnd = currentPage + pageRange;

        if (rangeEnd > totalPage) {
          rangeEnd = totalPage;
          rangeStart = totalPage - pageRange * 2;
          rangeStart = rangeStart < 1 ? 1 : rangeStart;
        }

        if (rangeStart <= 1) {
          rangeStart = 1;

          rangeEnd = Math.min(pageRange * 2 + 1, totalPage);
        }

        el.html(self.createTemplate({
          currentPage: currentPage,
          pageRange: pageRange,
          totalPage: totalPage,
          rangeStart: rangeStart,
          rangeEnd: rangeEnd
        }));

        // After render
        self.callHook('afterRender', isForced);

        return el;
      },

      // Create template
      createTemplate: function(args) {
        var self = this;
        var currentPage = args.currentPage;
        var totalPage = args.totalPage;
        var rangeStart = args.rangeStart;
        var rangeEnd = args.rangeEnd;

        var totalNumber = attributes.totalNumber;

        var showPrevious = attributes.showPrevious;
        var showNext = attributes.showNext;
        var showPageNumbers = attributes.showPageNumbers;
        var showNavigator = attributes.showNavigator;
        var showGoInput = attributes.showGoInput;
        var showGoButton = attributes.showGoButton;

        var pageLink = attributes.pageLink;
        var prevText = attributes.prevText;
        var nextText = attributes.nextText;
        var ellipsisText = attributes.ellipsisText;
        var goButtonText = attributes.goButtonText;

        var classPrefix = attributes.classPrefix;
        var activeClassName = attributes.activeClassName;
        var disableClassName = attributes.disableClassName;
        var ulClassName = attributes.ulClassName;

        var formatNavigator = $.isFunction(attributes.formatNavigator) ? attributes.formatNavigator() : attributes.formatNavigator;
        var formatGoInput = $.isFunction(attributes.formatGoInput) ? attributes.formatGoInput() : attributes.formatGoInput;
        var formatGoButton = $.isFunction(attributes.formatGoButton) ? attributes.formatGoButton() : attributes.formatGoButton;

        var autoHidePrevious = $.isFunction(attributes.autoHidePrevious) ? attributes.autoHidePrevious() : attributes.autoHidePrevious;
        var autoHideNext = $.isFunction(attributes.autoHideNext) ? attributes.autoHideNext() : attributes.autoHideNext;

        var header = $.isFunction(attributes.header) ? attributes.header() : attributes.header;
        var footer = $.isFunction(attributes.footer) ? attributes.footer() : attributes.footer;

        var html = '';
        var goInput = '<input type="text" class="J-paginationjs-go-pagenumber">';
        var goButton = '<input type="button" class="J-paginationjs-go-button" value="' + goButtonText + '">';
        var formattedString;
        var i;

        if (header) {
          formattedString = self.replaceVariables(header, {
            currentPage: currentPage,
            totalPage: totalPage,
            totalNumber: totalNumber
          });
          html += formattedString;
        }

        if (showPrevious || showPageNumbers || showNext) {
          html += '<div class="paginationjs-pages">';

          if (ulClassName) {
            html += '<ul class="' + ulClassName + '">';
          } else {
            html += '<ul>';
          }

          // Previous page button
          if (showPrevious) {
            if (currentPage === 1) {
              if (!autoHidePrevious) {
                html += '<li class="' + classPrefix + '-prev ' + disableClassName + '"><a>' + prevText + '<\/a><\/li>';
              }
            } else {
              html += '<li class="' + classPrefix + '-prev J-paginationjs-previous" data-num="' + (currentPage - 1) + '" title="Previous page"><a href="' + pageLink + '">' + prevText + '<\/a><\/li>';
            }
          }

          // Page numbers
          if (showPageNumbers) {
            if (rangeStart <= 3) {
              for (i = 1; i < rangeStart; i++) {
                if (i == currentPage) {
                  html += '<li class="' + classPrefix + '-page J-paginationjs-page ' + activeClassName + '" data-num="' + i + '"><a>' + i + '<\/a><\/li>';
                } else {
                  html += '<li class="' + classPrefix + '-page J-paginationjs-page" data-num="' + i + '"><a href="' + pageLink + '">' + i + '<\/a><\/li>';
                }
              }
            } else {
              if (attributes.showFirstOnEllipsisShow) {
                html += '<li class="' + classPrefix + '-page ' + classPrefix + '-first J-paginationjs-page" data-num="1"><a href="' + pageLink + '">1<\/a><\/li>';
              }
              html += '<li class="' + classPrefix + '-ellipsis ' + disableClassName + '"><a>' + ellipsisText + '<\/a><\/li>';
            }

            // Main loop
            for (i = rangeStart; i <= rangeEnd; i++) {
              if (i == currentPage) {
                html += '<li class="' + classPrefix + '-page J-paginationjs-page ' + activeClassName + '" data-num="' + i + '"><a>' + i + '<\/a><\/li>';
              } else {
                html += '<li class="' + classPrefix + '-page J-paginationjs-page" data-num="' + i + '"><a href="' + pageLink + '">' + i + '<\/a><\/li>';
              }
            }

            if (rangeEnd >= totalPage - 2) {
              for (i = rangeEnd + 1; i <= totalPage; i++) {
                html += '<li class="' + classPrefix + '-page J-paginationjs-page" data-num="' + i + '"><a href="' + pageLink + '">' + i + '<\/a><\/li>';
              }
            } else {
              html += '<li class="' + classPrefix + '-ellipsis ' + disableClassName + '"><a>' + ellipsisText + '<\/a><\/li>';

              if (attributes.showLastOnEllipsisShow) {
                html += '<li class="' + classPrefix + '-page ' + classPrefix + '-last J-paginationjs-page" data-num="' + totalPage + '"><a href="' + pageLink + '">' + totalPage + '<\/a><\/li>';
              }
            }
          }

          // Next page button
          if (showNext) {
            if (currentPage == totalPage) {
              if (!autoHideNext) {
                html += '<li class="' + classPrefix + '-next ' + disableClassName + '"><a>' + nextText + '<\/a><\/li>';
              }
            } else {
              html += '<li class="' + classPrefix + '-next J-paginationjs-next" data-num="' + (currentPage + 1) + '" title="Next page"><a href="' + pageLink + '">' + nextText + '<\/a><\/li>';
            }
          }
          html += '<\/ul><\/div>';
        }

        // Navigator
        if (showNavigator) {
          if (formatNavigator) {
            formattedString = self.replaceVariables(formatNavigator, {
              currentPage: currentPage,
              totalPage: totalPage,
              totalNumber: totalNumber
            });
            html += '<div class="' + classPrefix + '-nav J-paginationjs-nav">' + formattedString + '<\/div>';
          }
        }

        // Go input
        if (showGoInput) {
          if (formatGoInput) {
            formattedString = self.replaceVariables(formatGoInput, {
              currentPage: currentPage,
              totalPage: totalPage,
              totalNumber: totalNumber,
              input: goInput
            });
            html += '<div class="' + classPrefix + '-go-input">' + formattedString + '</div>';
          }
        }

        // Go button
        if (showGoButton) {
          if (formatGoButton) {
            formattedString = self.replaceVariables(formatGoButton, {
              currentPage: currentPage,
              totalPage: totalPage,
              totalNumber: totalNumber,
              button: goButton
            });
            html += '<div class="' + classPrefix + '-go-button">' + formattedString + '</div>';
          }
        }

        if (footer) {
          formattedString = self.replaceVariables(footer, {
            currentPage: currentPage,
            totalPage: totalPage,
            totalNumber: totalNumber
          });
          html += formattedString;
        }

        return html;
      },

      // Go to the specified page
      go: function(number, callback) {
        var self = this;
        var model = self.model;

        if (self.disabled) return;

        var pageNumber = number;
        var pageSize = attributes.pageSize;
        var totalPage = model.totalPage;

        pageNumber = parseInt(pageNumber);

        // Page number out of bounds
        if (!pageNumber || pageNumber < 1 || pageNumber > totalPage) return;

        // Sync mode
        if (self.sync) {
          render(self.getDataSegment(pageNumber));
          return;
        }

        var postData = {};
        var alias = attributes.alias || {};

        postData[alias.pageSize ? alias.pageSize : 'pageSize'] = pageSize;
        postData[alias.pageNumber ? alias.pageNumber : 'pageNumber'] = pageNumber;

        var formatAjaxParams = {
          type: 'get',
          cache: false,
          data: {},
          contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
          dataType: 'json',
          async: true
        };

        $.extend(true, formatAjaxParams, attributes.ajax);
        $.extend(formatAjaxParams.data || {}, postData);

        formatAjaxParams.url = attributes.dataSource;
        formatAjaxParams.success = function(response) {
          render(self.filterDataByLocator(response));
        };
        formatAjaxParams.error = function(jqXHR, textStatus, errorThrown) {
          attributes.formatAjaxError && attributes.formatAjaxError(jqXHR, textStatus, errorThrown);
          self.enable();
        };

        self.disable();

        $.ajax(formatAjaxParams);

        function render(data) {
          // Before paging
          if (self.callHook('beforePaging', pageNumber) === false) return false;

          // Pagination direction
          model.direction = typeof model.pageNumber === 'undefined' ? 0 : (pageNumber > model.pageNumber ? 1 : -1);

          model.pageNumber = pageNumber;

          self.render();

          if (self.disabled && !self.sync) {
            // enable
            self.enable();
          }

          // cache model data
          container.data('pagination').model = model;

          // format result before execute callback
          if ($.isFunction(attributes.formatResult)) {
            var cloneData = $.extend(true, [], data);
            if (!Helpers.isArray(data = attributes.formatResult(cloneData))) {
              data = cloneData;
            }
          }

          container.data('pagination').currentPageData = data;

          // callback
          self.doCallback(data, callback);

          // After pageing
          self.callHook('afterPaging', pageNumber);

          // Already the first page
          if (pageNumber == 1) {
            self.callHook('afterIsFirstPage');
          }

          // Already the last page
          if (pageNumber == model.totalPage) {
            self.callHook('afterIsLastPage');
          }
        }
      },

      doCallback: function(data, customCallback) {
        var self = this;
        var model = self.model;

        if ($.isFunction(customCallback)) {
          customCallback(data, model);
        } else if ($.isFunction(attributes.callback)) {
          attributes.callback(data, model);
        }
      },

      destroy: function() {
        // Before destroy
        if (this.callHook('beforeDestroy') === false) return;

        this.model.el.remove();
        container.off();

        // Remove style element
        $('#paginationjs-style').remove();

        // After destroy
        this.callHook('afterDestroy');
      },

      previous: function(callback) {
        this.go(this.model.pageNumber - 1, callback);
      },

      next: function(callback) {
        this.go(this.model.pageNumber + 1, callback);
      },

      disable: function() {
        var self = this;
        var source = self.sync ? 'sync' : 'async';

        // Before disabling
        if (self.callHook('beforeDisable', source) === false) return;

        self.disabled = true;
        self.model.disabled = true;

        // After disabling
        self.callHook('afterDisable', source);
      },

      enable: function() {
        var self = this;
        var source = self.sync ? 'sync' : 'async';

        // Before enabling
        if (self.callHook('beforeEnable', source) === false) return;

        self.disabled = false;
        self.model.disabled = false;

        // After enabling
        self.callHook('afterEnable', source);
      },

      refresh: function(callback) {
        this.go(this.model.pageNumber, callback);
      },

      show: function() {
        var self = this;

        if (self.model.el.is(':visible')) return;

        self.model.el.show();
      },

      hide: function() {
        var self = this;

        if (!self.model.el.is(':visible')) return;

        self.model.el.hide();
      },

      // Replace variables of template
      replaceVariables: function(template, variables) {
        var formattedString;

        for (var key in variables) {
          var value = variables[key];
          var regexp = new RegExp('<%=\\s*' + key + '\\s*%>', 'img');

          formattedString = (formattedString || template).replace(regexp, value);
        }

        return formattedString;
      },

      // Get data segments
      getDataSegment: function(number) {
        var pageSize = attributes.pageSize;
        var dataSource = attributes.dataSource;
        var totalNumber = attributes.totalNumber;

        var start = pageSize * (number - 1) + 1;
        var end = Math.min(number * pageSize, totalNumber);

        return dataSource.slice(start - 1, end);
      },

      // Get total page
      getTotalPage: function() {
        return Math.ceil(attributes.totalNumber / attributes.pageSize);
      },

      // Get locator
      getLocator: function(locator) {
        var result;

        if (typeof locator === 'string') {
          result = locator;
        } else if ($.isFunction(locator)) {
          result = locator();
        } else {
          throwError('"locator" is incorrect. (String | Function)');
        }

        return result;
      },

      // Filter data by "locator"
      filterDataByLocator: function(dataSource) {
        var locator = this.getLocator(attributes.locator);
        var filteredData;

        // Data source is an Object, use "locator" to locate the true data
        if (Helpers.isObject(dataSource)) {
          try {
            $.each(locator.split('.'), function(index, item) {
              filteredData = (filteredData ? filteredData : dataSource)[item];
            });
          }
          catch (e) {
          }

          if (!filteredData) {
            throwError('dataSource.' + locator + ' is undefined.');
          } else if (!Helpers.isArray(filteredData)) {
            throwError('dataSource.' + locator + ' must be an Array.');
          }
        }

        return filteredData || dataSource;
      },

      // Parse dataSource
      parseDataSource: function(dataSource, callback) {
        var self = this;
        var args = arguments;

        if (Helpers.isObject(dataSource)) {
          callback(attributes.dataSource = self.filterDataByLocator(dataSource));
        } else if (Helpers.isArray(dataSource)) {
          callback(attributes.dataSource = dataSource);
        } else if ($.isFunction(dataSource)) {
          attributes.dataSource(function(data) {
            if ($.isFunction(data)) {
              throwError('Unexpect parameter of the "done" Function.');
            }
              self.parseDataSource.call(self, data, callback);
          });
        } else if (typeof dataSource === 'string') {
          if (/^https?|file:/.test(dataSource)) {
            attributes.ajaxDataType = 'jsonp';
          }
          callback(dataSource);
        } else {
          throwError('Unexpect data type of the "dataSource".');
        }
      },

      callHook: function(hook) {
        var paginationData = container.data('pagination');
        var result;

        var args = Array.prototype.slice.apply(arguments);
        args.shift();

        if (attributes[hook] && $.isFunction(attributes[hook])) {
          if (attributes[hook].apply(global, args) === false) {
            result = false;
          }
        }

        if (paginationData.hooks && paginationData.hooks[hook]) {
          $.each(paginationData.hooks[hook], function(index, item) {
            if (item.apply(global, args) === false) {
              result = false;
            }
          });
        }

        return result !== false;
      },

      observer: function() {
        var self = this;
        var el = self.model.el;

        // Go to page
        container.on(eventPrefix + 'go', function(event, pageNumber, done) {
          pageNumber = parseInt($.trim(pageNumber));

          if (!pageNumber) return;

          if (!$.isNumeric(pageNumber)) {
            throwError('"pageNumber" is incorrect. (Number)');
          }

          self.go(pageNumber, done);
        });

        // Page click
        el.delegate('.J-paginationjs-page', 'click', function(event) {
          var current = $(event.currentTarget);
          var pageNumber = $.trim(current.attr('data-num'));

          if (!pageNumber || current.hasClass(attributes.disableClassName) || current.hasClass(attributes.activeClassName)) return;

          // Before page button clicked
          if (self.callHook('beforePageOnClick', event, pageNumber) === false) return false;

          self.go(pageNumber);

          // After page button clicked
          self.callHook('afterPageOnClick', event, pageNumber);

          if (!attributes.pageLink) return false;
        });

        // Previous click
        el.delegate('.J-paginationjs-previous', 'click', function(event) {
          var current = $(event.currentTarget);
          var pageNumber = $.trim(current.attr('data-num'));

          if (!pageNumber || current.hasClass(attributes.disableClassName)) return;

          // Before previous clicked
          if (self.callHook('beforePreviousOnClick', event, pageNumber) === false) return false;

          self.go(pageNumber);

          // After previous clicked
          self.callHook('afterPreviousOnClick', event, pageNumber);

          if (!attributes.pageLink) return false;
        });

        // Next click
        el.delegate('.J-paginationjs-next', 'click', function(event) {
          var current = $(event.currentTarget);
          var pageNumber = $.trim(current.attr('data-num'));

          if (!pageNumber || current.hasClass(attributes.disableClassName)) return;

          // Before next clicked
          if (self.callHook('beforeNextOnClick', event, pageNumber) === false) return false;

          self.go(pageNumber);

          // After next clicked
          self.callHook('afterNextOnClick', event, pageNumber);

          if (!attributes.pageLink) return false;
        });

        // Go button click
        el.delegate('.J-paginationjs-go-button', 'click', function(event) {
          var pageNumber = $('.J-paginationjs-go-pagenumber', el).val();

          // Before Go button clicked
          if (self.callHook('beforeGoButtonOnClick', event, pageNumber) === false) return false;

          container.trigger(eventPrefix + 'go', pageNumber);

          // After Go button clicked
          self.callHook('afterGoButtonOnClick', event, pageNumber);
        });

        // go input enter
        el.delegate('.J-paginationjs-go-pagenumber', 'keyup', function(event) {
          if (event.which === 13) {
            var pageNumber = $(event.currentTarget).val();

            // Before Go input enter
            if (self.callHook('beforeGoInputOnEnter', event, pageNumber) === false) return false;

            container.trigger(eventPrefix + 'go', pageNumber);

            // Regains focus
            $('.J-paginationjs-go-pagenumber', el).focus();

            // After Go input enter
            self.callHook('afterGoInputOnEnter', event, pageNumber);
          }
        });

        // Previous page
        container.on(eventPrefix + 'previous', function(event, done) {
          self.previous(done);
        });

        // Next page
        container.on(eventPrefix + 'next', function(event, done) {
          self.next(done);
        });

        // Disable
        container.on(eventPrefix + 'disable', function() {
          self.disable();
        });

        // Enable
        container.on(eventPrefix + 'enable', function() {
          self.enable();
        });

        // Refresh
        container.on(eventPrefix + 'refresh', function(event, done) {
          self.refresh(done);
        });

        // Show
        container.on(eventPrefix + 'show', function() {
          self.show();
        });

        // Hide
        container.on(eventPrefix + 'hide', function() {
          self.hide();
        });

        // Destroy
        container.on(eventPrefix + 'destroy', function() {
          self.destroy();
        });

        // Whether to load the default page
        if (attributes.triggerPagingOnInit) {
          container.trigger(eventPrefix + 'go', Math.min(attributes.pageNumber, self.model.totalPage));
        }
      }
    };

    // If initial
    if (container.data('pagination') && container.data('pagination').initialized === true) {
      // Handling events
      if ($.isNumeric(options)) {
        // container.pagination(5)
        container.trigger.call(this, eventPrefix + 'go', options, arguments[1]);
        return this;
      } else if (typeof options === 'string') {
        var args = Array.prototype.slice.apply(arguments);
        args[0] = eventPrefix + args[0];

        switch (options) {
          case 'previous':
          case 'next':
          case 'go':
          case 'disable':
          case 'enable':
          case 'refresh':
          case 'show':
          case 'hide':
          case 'destroy':
            container.trigger.apply(this, args);
            break;
          // Get selected page number
          case 'getSelectedPageNum':
            if (container.data('pagination').model) {
              return container.data('pagination').model.pageNumber;
            } else {
              return container.data('pagination').attributes.pageNumber;
            }
          // Get total page
          case 'getTotalPage':
            return container.data('pagination').model.totalPage;
          // Get selected page data
          case 'getSelectedPageData':
            return container.data('pagination').currentPageData;
          // Whether pagination was be disabled
          case 'isDisabled':
            return container.data('pagination').model.disabled === true;
          default:
            throwError('Pagination do not provide action: ' + options);
        }
        return this;
      } else {
        // Uninstall the old instance before initialize a new one
        uninstallPlugin(container);
      }
    } else {
      if (!Helpers.isObject(options)) throwError('Illegal options');
    }

    // Attributes
    var attributes = $.extend({}, $.fn[pluginName].defaults, options);

    // Check parameters
    parameterChecker(attributes);

    pagination.initialize();

    return this;
  };

  // Instance defaults
  $.fn[pluginName].defaults = {

    // Data source
    // Array | String | Function | Object
    //dataSource: '',

    // String | Function
    //locator: 'data',

    // Total entries, must be specified when the pagination is asynchronous
    totalNumber: 1,

    // Default page
    pageNumber: 1,

    // entries of per page
    pageSize: 10,

    // Page range (pages on both sides of the current page)
    pageRange: 2,

    // Whether to display the 'Previous' button
    showPrevious: true,

    // Whether to display the 'Next' button
    showNext: true,

    // Whether to display the page buttons
    showPageNumbers: true,

    showNavigator: false,

    // Whether to display the 'Go' input
    showGoInput: false,

    // Whether to display the 'Go' button
    showGoButton: false,

    // Page link
    pageLink: '',

    // 'Previous' text
    prevText: '&laquo;',

    // 'Next' text
    nextText: '&raquo;',

    // Ellipsis text
    ellipsisText: '...',

    // 'Go' button text
    goButtonText: 'Go',

    // Additional className for Pagination element
    //className: '',

    classPrefix: 'paginationjs',

    // Default active class
    activeClassName: 'active',

    // Default disable class
    disableClassName: 'disabled',

    //ulClassName: '',

    // Whether to insert inline style
    inlineStyle: true,

    formatNavigator: '<%= currentPage %> / <%= totalPage %>',

    formatGoInput: '<%= input %>',

    formatGoButton: '<%= button %>',

    // Pagination element's position in the container
    position: 'bottom',

    // Auto hide previous button when current page is the first page
    autoHidePrevious: false,

    // Auto hide next button when current page is the last page
    autoHideNext: false,

    //header: '',

    //footer: '',

    // Aliases for custom pagination parameters
    //alias: {},

    // Whether to trigger pagination at initialization
    triggerPagingOnInit: true,

    // Whether to hide pagination when less than one page
    hideWhenLessThanOnePage: false,

    showFirstOnEllipsisShow: true,

    showLastOnEllipsisShow: true,

    // Pagging callback
    callback: function() {
    }
  };

  // Hook register
  $.fn[pluginHookMethod] = function(hook, callback) {
    if (arguments.length < 2) {
      throwError('Missing argument.');
    }

    if (!$.isFunction(callback)) {
      throwError('callback must be a function.');
    }

    var container = $(this);
    var paginationData = container.data('pagination');

    if (!paginationData) {
      container.data('pagination', {});
      paginationData = container.data('pagination');
    }

    !paginationData.hooks && (paginationData.hooks = {});

    //paginationData.hooks[hook] = callback;
    paginationData.hooks[hook] = paginationData.hooks[hook] || [];
    paginationData.hooks[hook].push(callback);

  };

  // Static method
  $[pluginName] = function(selector, options) {
    if (arguments.length < 2) {
      throwError('Requires two parameters.');
    }

    var container;

    // 'selector' is a jQuery object
    if (typeof selector !== 'string' && selector instanceof jQuery) {
      container = selector;
    } else {
      container = $(selector);
    }

    if (!container.length) return;

    container.pagination(options);

    return container;
  };

  // ============================================================
  // helpers
  // ============================================================

  var Helpers = {};

  // Throw error
  function throwError(content) {
    throw new Error('Pagination: ' + content);
  }

  // Check parameters
  function parameterChecker(args) {
    if (!args.dataSource) {
      throwError('"dataSource" is required.');
    }

    if (typeof args.dataSource === 'string') {
      if (typeof args.totalNumber === 'undefined') {
        throwError('"totalNumber" is required.');
      } else if (!$.isNumeric(args.totalNumber)) {
        throwError('"totalNumber" is incorrect. (Number)');
      }
    } else if (Helpers.isObject(args.dataSource)) {
      if (typeof args.locator === 'undefined') {
        throwError('"dataSource" is an Object, please specify "locator".');
      } else if (typeof args.locator !== 'string' && !$.isFunction(args.locator)) {
        throwError('' + args.locator + ' is incorrect. (String | Function)');
      }
    }
  }

  // uninstall plugin
  function uninstallPlugin(target) {
    var events = ['go', 'previous', 'next', 'disable', 'enable', 'refresh', 'show', 'hide', 'destroy'];

    // off events of old instance
    $.each(events, function(index, value) {
      target.off(eventPrefix + value);
    });

    // reset pagination data
    target.data('pagination', {});

    // remove old
    $('.paginationjs', target).remove();
  }

  // Object type detection
  function getObjectType(object, tmp) {
    return ( (tmp = typeof(object)) == "object" ? object == null && "null" || Object.prototype.toString.call(object).slice(8, -1) : tmp ).toLowerCase();
  }

  $.each(['Object', 'Array'], function(index, name) {
    Helpers['is' + name] = function(object) {
      return getObjectType(object) === name.toLowerCase();
    };
  });

  /*
   * export via AMD or CommonJS
   * */
  if (typeof define === 'function' && define.amd) {
    define(function() {
      return $;
    });
  }

})(this, window.jQuery);
/*
 * 表单验证
**/
(function($){
  $.fn.validate = function(valiObj,callB){
        var callB;//回调函数
        var valiObj;//验证规则

        //当前调用对象
        var _this = $(this);
         //判断为空
        function isnull(thisInput){
            var nullResult = true;
            var require = thisInput.attr('require');

            if(require && thisInput.val() == ''){
                nullResult = false;
            }
            return nullResult;
        }

        //判断长度  
        function minLen(thisInput){
            var minResult = true;
            var minlen = thisInput.attr('minlen');
            var len = _byte_count(thisInput.val());

            if (minlen && len < minlen) {
                minResult = false;
            }
            return minResult;
        }
        //判断长度  
        function maxLen(thisInput){
            var maxResult = true;
            var maxlen = thisInput.attr('maxlen');
            var len = _byte_count(thisInput.val());
            if(maxlen && len > maxlen){
                maxResult = false;
            }
            return maxResult;
        }

        //获取长度 中文和全角符号长度计为2
        function _byte_count(_strvalue) { 
            _strvalue = _strvalue.replace(/([\u0391-\uFFE5])/ig,'xs');
            var count = _strvalue.length;
            return count;
        }
        var flag;

        //自带的和自定义

        function defaultValidate(thisInput){
            var defaultResult = true;
            var invali = thisInput.attr('validate');
            if(defaultVali[invali]){
                var regExp = defaultVali[invali]['regExp'];
                var matchResult = thisInput.val().match(regExp);
               
                if(invali){
                    if(invali == 'full' || invali == 'normal' || invali == 'full_chinese'){
                        if(matchResult && thisInput.val() != ''){
                            thisInput.data({"fullMatch":unique(matchResult).join(',')});
                            defaultResult = false;
                        }
                    }else{
                        if(!matchResult && thisInput.val() != ''){
                            defaultResult = false;
                        }
                    }
                    
                }
            }else{
                var match = thisInput.val().match(eval(invali));
                if(!match && thisInput.val() != ''){
                    defaultResult = false;
                }
            }
            

            return defaultResult;
        }
        //点击checkbox判断长度
        function checkboxMin(thisInput){
            var thisName = thisInput.attr('name');
            var min = _this.find('[name="'+ thisName +'"]').attr('minnum');
            var checkedLength = _this.find('[name="'+ thisName +'"]:checked').length;
            if(min){
                if(checkedLength < min){
                    return false;
                }
            }
            return true;
        }
        //点击checkbox判断长度
        function checkboxMax(thisInput){
            var thisName = thisInput.attr('name');
            var max = _this.find('[name="'+ thisName +'"]').attr('maxnum');
            var checkedLength = _this.find('[name="'+ thisName +'"]:checked').length;
            if(max){
                if(checkedLength > max){
                    return false;
                }
            }
            return true;
        }

        //默认的验证规则
        var defaultVali = {
            "full":{
                "regExp":/[\[\]:?\"{}`=^&!*|;$%@'<>()+\r\n,\\../ ]/igm,
                "erroMsg":""
            },
            "full_chinese":{
                "regExp":/[\[\]:?\"{}`=^&!*|;$%@'<>()+\r\n,\\../ Α-￥]/igm,
                "erroMsg":""
            },
            "normal":{
                "regExp":/[|;$%'<>`()+\r\n,\\../ *]/igm,
                "erroMsg":""
            },
            "money":{
                "regExp":/^(0|(0\.0[1-9])|(0\.[1-9][0-9]?)|([1-9]([0-9]{1,5})?(\.\d{1,2})?))$/igm,
                "erroMsg":""
            },
            "less":{
                "regExp":/.+/igm,
                "erroMsg":""
            },
            "sfzhm":{
                "regExp":/^[1-9]\d{5}\d{4}[01]\d[0-3]\d{4}[0-9xX]$/igm,
                "erroMsg":"请输入18位有效的身份证号码"
            },
            "yb":{
                "regExp":/^[0-9]{6}$/igm,
                "erroMsg":"请输入有效邮编号码"
            },
            "email":{
                "regExp":/^[-\w]?\w+([-+.]\w+)*[-\w]?@[-\w]?\w+([-.]\w+)*[-\w]?\.[-\w]?\w+([-.]\w+)*[-\w]?$/igm,
                "erroMsg":"请输入有效的邮箱地址"
            },
            "phone":{
                "regExp":/^1[0-9]{10}$/,
                "erroMsg":"请输入有效手机号"
            },
            "lxdh":{
                "regExp":/^((\d{11})|((\d{3,4}-)?\d{7,8}(-\d{1,4})?))$/igm,
                "erroMsg":"请输入有效固定电话号码"
            },
            "url":{
                "regExp":/^http:\/\/[A-Za-z0-9]+\.[A-Za-z0-9]+[\/=\?%\-&_~`@[\]\':+!]*([^<>\"\"])*$/igm,
                "erroMsg":"请输入正确的网址"
            },
            "english":{
                "regExp":/^[A-Za-z]+$/igm,
                "erroMsg":"请填写英文"
            },
            "chinese":{
                "regExp":/^[\u0391-\uFFE5]+$/igm,
                "erroMsg":"请填写中文"
            },
            "qq":{
                "regExp":/^[1-9]\d{4,9}$/igm,
                "erroMsg":"请填写正确的qq号码"
            },
            "number":{
                "regExp":/^\d+$/igm,
                "erroMsg":"请填写合法数字"
            },
            "num":{
                "regExp":/^[1-9]\d*$/igm,
                "erroMsg":"请填写合法数字"
            },
            "integer":{
                "regExp":/^[-\+]?\d+$/igm,
                "erroMsg":"请填写合法数字"
            },
            "double":{
                "regExp":/^[-\+]?\d+(\.\d+)?$/igm,
                "erroMsg":"请填写合法数字"
            },
            "posdouble":{
                "regExp":/^\d+(\.\d+)?$/igm,
                "erroMsg":"请填写合法数字"
            }
        }

        //获取callB
        if(arguments.length == 1 && typeof arguments[0] == "function"){
             
            callB = arguments[0];
            valiObj = null;
        }else{
            if(typeof arguments[1] == "function"){
                callB = arguments[1];
                valiObj = arguments[0];
            }else{
                callB = null;
            }
        }
        //在元素上设置 相关属性
        function setValiToele(){
            if(valiObj){
                for(var obj in valiObj){
                    var validate = valiObj[obj];
                    for(var attr in validate){
                        if(attr == 'erroMsg'){
                            _this.find('[name="'+ obj +'"]').attr(attr,JSON.stringify(validate[attr]));
                        }else{
                            _this.find('[name="'+ obj +'"]').attr(attr,validate[attr]);
                        }                  
                    } 
                }
            }
            
        }
        setValiToele();
        //去掉数组重复元素
        function unique(arr) {
            arr.sort();   
            var arr0 = [arr[0]];  
            for(var i = 1; i < arr.length; i++){
                if(arr[i] !== arr0[arr0.length - 1]){  
                    arr0.push(arr[i]);  
                }              
            }
            return arr0;  
        }
        //显示错误信息
        function errorMessage(thisInput,errMes){
            if(thisInput.attr('erromsg')){
                var erromsg = JSON.parse(thisInput.attr('erromsg'));
                return erromsg[errMes]; 
            }else{
                return '';
            }         
        }
        _this.on('click', '[type="checkbox"]', function(){
            var thisInput = $(this);
            var thisName = thisInput.attr('name');
            var errMess = '';
            if(thisInput.attr('require') || _this.find('[name="'+ thisName +'"]:checked').length > 0){
                inputvalidate(thisInput,errMess);
            }
        })
       _this.on('blur','[validate]',function(){    
            var thisInput = $(this);
            var errMess = '';
            inputvalidate(thisInput,errMess);
       });
       function inputvalidate(thisInput,errMess){
            var flag = true;
            //判断必填
            if(thisInput.attr('require')  && !isnull(thisInput)){
                flag = false;
                if(errorMessage(thisInput,'require')){
                    errMess += "<span>"+errorMessage(thisInput,'require')+"</span>";
                }else{
                    errMess += '<span>不能为空</span>';
                }
            }
            //判断长度
            if(thisInput.attr('minlen') && !minLen(thisInput)){
                flag = false;
                if(errorMessage(thisInput,'minlen')){
                    errMess += "<span>"+errorMessage(thisInput,'minlen')+"</span>";
                }else{
                    errMess += '<span>长度应大于' + thisInput.attr('minlen')+"</span>";
                }
            }

            if(thisInput.attr('maxlen') && !maxLen(thisInput)){
                flag = false;
                if(errorMessage(thisInput,'maxlen')){
                    errMess += "<span>"+errorMessage(thisInput,'maxlen')+"</span>";
                }else{
                    errMess += '<span>长度应小于' + thisInput.attr('maxlen')+"</span>";
                }
            }
            //自定义
            if(thisInput.attr('pattern') && !ispatten(thisInput)){
                flag = false;
                if(errorMessage(thisInput,'pattern')){
                    errMess += "<span>"+errorMessage(thisInput,'pattern')+"</span>";
                }else{
                    errMess += '<span>验证失败</span>';
                }
            }
            //自带的
            var validatetest = thisInput.attr('validate') && !defaultValidate(thisInput);
            if(validatetest){
                flag = false;
                if(errorMessage(thisInput,'validate')){
                    errMess += "<span>"+errorMessage(thisInput,'validate')+"</span>";
                }else{
                    if(defaultVali[thisInput.attr('validate')]){
                        if(defaultVali[thisInput.attr('validate')]['erroMsg']){
                            errMess += "<span>"+defaultVali[thisInput.attr('validate')]['erroMsg']+"</span>";
                        }else{
                            errMess += '<span>含有非法字符'+ thisInput.data("fullMatch") +'</span>';
                        }
                    }else{
                        errMess += '<span>含有非法字符'+ thisInput.data("fullMatch") +'</span>';
                    }
                }
            }
            //checkbox判断长度
            if(thisInput.attr('minnum') && !checkboxMin(thisInput)){
                flag = false;
                if(errorMessage(thisInput,'minnum')){
                    errMess += "<span>"+errorMessage(thisInput,'minnum')+"</span>";
                }else{
                    errMess += '<span>多选框应选择多于' + thisInput.attr('minnum')+"</span>";
                }
            }
            if(thisInput.attr('maxnum') && !checkboxMax(thisInput)){
                flag = false;
                if(errorMessage(thisInput,'maxnum')){
                    errMess += "<span>"+errorMessage(thisInput,'maxnum')+"</span>";
                }else{
                    errMess += '<span>多选框应选择少于' + thisInput.attr('maxnum')+"</span>";
                }
            }
            //远程
            if(thisInput.attr('remote')){
                if(sessionStorage.getItem('id_token')){
                    $.ajaxSetup({
                        headers: {           
                          'Authorization':'Bearer ' +  sessionStorage.getItem('id_token')
                        }
                    });
                }
                var url  = thisInput.attr('remote') + thisInput.val();
                var succMsg;
                if(thisInput.attr('succMsg')){
                    succMsg = thisInput.attr('succMsg');
                }
                $.ajax({
                    "url":url,
                    "type":"GET",
                    "success":function(data){
                        thisInput.attr('remoted','true');
                    },
                    "error":function(data){
                        thisInput.attr('remoted','false');
                        if(errorMessage(thisInput,'remote')){
                            errMess += "<span>"+errorMessage(thisInput,'remote')+"</span>";
                        }else{
                            errMess += '<span>远程验证未通过</span>';
                        }
                        if(thisInput.attr('errocontain')){
                            var errocontain = thisInput.attr('errocontain');
                            $(errocontain).html(errMess);
                        }else{
                            if(thisInput.next('span')){
                                thisInput.next('span').html(errMess);
                            }
                        }
                    }
                });  
            }  
            
            if(thisInput.attr('errocontain')){
                var errocontain = thisInput.attr('errocontain');
                $(errocontain).html(errMess);
            }else{
                thisInput.next('span').html(errMess);
            }
            return flag;
       }

        //聚焦清除
        _this.on('focus', '[validate]', function(){
            if($(this).attr('errocontain')){
                var errocontain = $(this).attr('errocontain');
                $(errocontain).html('');
            }else{
                if($(this).next('span')){
                    $(this).next('span').html('');
                }
                
            }
        }); 

        //点击提交按钮
        _this.find('[vtotal]').click(function(){
            if(commit()){
                if(callB){
                    callB();
                }
            } 
       });
       function commit(){
            var erromsges = '';
            var flag = true;
            _this.find('[validate]').each(function(){
                var thisInput = $(this);
                var errMess = '';
                if(!inputvalidate(thisInput,errMess)){
                    flag = false;
                }
            })
            
            _this.find('[remote]').each(function(){
                if($(this).attr('remoted')){
                    if($(this).attr('remoted')=="false"){
                        flag = false;
                    }
                }else{
                    flag = false;
                }
            });
            

            _this.find('[type="checkbox"]').each(function(){
                var thisInput = $(this);
                var errMess = '';
                var errocontain = thisInput.attr('errocontain');
                if(!$(errocontain).text()){
                    if(!inputvalidate(thisInput,errMess)){
                        flag = false;
                    }
                }else{
                    flag = false;
                }
            })
            return flag;
       }
    }
})(jQuery);


(function($){
	$.fn.getPostData = function(){
		var returnData = {};
		var falgObj = {};
		$(this).find('[paramete]').each(function(index, element){
			if($(this).prop('type') == 'checkbox'){
				if(!falgObj[$(this).attr('paramete')]){
					var tempArr = [];
					$('input[type="checkbox"][paramete="'+$(this).attr('paramete')+'"]:checked').each(function(index, element) {
						tempArr.push($(this).val());
					});
					returnData[$(this).attr('paramete')] = tempArr;
					falgObj[$(this).attr('paramete')] = true;
				}
			}else if($(this).prop('type') == 'radio'){
				if(!falgObj[$(this).attr('paramete')]){
					returnData[$(this).attr('paramete')] = $('input[type="radio"][paramete="'+$(this).attr('paramete')+'"]:checked').val();
					falgObj[$(this).attr('paramete')] = true;
				}
			}else{
				returnData[$(this).attr('paramete')] = $(this).val();
				if($(this).val() == $(this).attr('placeholder')){
					returnData[$(this).attr('paramete')] = '';
				}
				falgObj[$(this).attr('paramete')] = true;
			}
		});
		return returnData;
		
	}
})($);