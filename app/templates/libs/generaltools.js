var $ = require('jquery');
require('paginationjs');
var template = require('template');
(function(){
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
                    var list = {data:data}
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
  	$.fn.paging = function(obj){
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



})($);
module.exports = $;