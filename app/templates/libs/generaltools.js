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


    //验证
    $.fn.validate = function(callB){
      //信息是否有错标志位
      var flag = true;
      //ajax信息是否有错标志位
      var ajaxf = true;

      //验证规则
      var regExp = {
        "full":/[\[\]:?\"{}`=^&!*|;$%@'<>()+\r\n,\\../ ]/igm,
        "full_chinese":/[\[\]:?\"{}`=^&!*|;$%@'<>()+\r\n,\\../ Α-￥]/igm,
        "normal":/[|;$%'<>`()+\r\n,\\../ *]/igm,
        "money":/^(0|(0\.0[1-9])|(0\.[1-9][0-9]?)|([1-9]([0-9]{1,5})?(\.\d{1,2})?))$/igm,
        "less":/.+/igm,
        //"sfzhm":/^[1-9]\d{5}\d{4}[01]\d[0-3]\d{4}[0-9xX]$/igm,
        "yb":/^[0-9]{6}$/igm,
        "email":/^[-\w]?\w+([-+.]\w+)*[-\w]?@[-\w]?\w+([-.]\w+)*[-\w]?\.[-\w]?\w+([-.]\w+)*[-\w]?$/igm,
        "phone":/^1[0-9]{10}$/,
        "lxdh":/^((\d{11})|((\d{3,4}-)?\d{7,8}(-\d{1,4})?))$/igm,
        "url":/^http:\/\/[A-Za-z0-9]+\.[A-Za-z0-9]+[\/=\?%\-&_~`@[\]\':+!]*([^<>\"\"])*$/igm,
        "english":/^[A-Za-z]+$/igm,
        "chinese":/^[\u0391-\uFFE5]+$/igm,
        "qq":/^[1-9]\d{4,9}$/igm,
        "number":/^\d+$/igm,
        "num":/^[1-9]\d*$/igm,
        "integer":/^[-\+]?\d+$/igm,
        "double":/^[-\+]?\d+(\.\d+)?$/igm,
        "posdouble":/^\d+(\.\d+)?$/igm
      }
      //错误提示信息
      var errorMsg = {
        "full":'',
        "normal":'',
        "less":'',
        "sfzhm":'请输入18位有效的身份证号码',
        "yb":'请输入有效邮编号码',
        "sjh":'请输入有效手机号',
        "email":'请输入有效的邮箱地址',
        "lxdh":'请输入有效电话号码',
        "url":'请输入正确的网址',
        "english":'请填写英文',
        "chinese":'请填写中文',
        "qq":'请填写正确的qq号码',
        "number":'请填写合法数字',
        "num":'请填写合法数字',
        "integer":'请填写合法数字',
        "double":'请填写合法数字',
        "posdouble":'请填写合法数字' 
      }

      var _this = $(this);

      //去掉数组重复元素
      function unique(arr) {
        var result = [], hash = {};
        for (var i = 0, elem; (elem = arr[i]) != null; i++) {
          if (!hash[elem]) {
            result.push(elem);
            hash[elem] = true;
          }
        }
        return result;
      }

      //去空格,判断是否为正整数(包含0)
      function _to_trim_all(strValue){
        return (strValue+"").replace(/\s+/g,"");
      }

      //判断是不是正整数
      function isNumber(strValue){
        if(_to_trim_all(strValue)==""){
          return false;
        }
        if(! /^[0-9]*$/.test(strValue)){
            return false;
        }
        return true;
      }
      function isMoney(strValue){
        var _input_value=_to_trim_all(strValue);
        var _index=_input_value.indexOf(".");
        if(isNaN(_input_value)||_index==0||_index==_input_value.length-1||_input_value.toUpperCase().indexOf("E")!=-1){
          return false;
        }
        return true;
      }

      //15位身份证号转成18位
      function convertSfzhm(_sfzhm){
        var _l_l_jym= new Array(7,9,10,5,8,4,2,1,6,3,7,9,10,5,8,4,2,1);
        var _l_l_total = 0;
        var _last_char;
        var _input_value = new String(_sfzhm);
        if (_input_value.length==15){
          var _input_value_temp = _input_value.substring(0,6) + "19" + _input_value.substring(6,15);
          for(var i=0;i<_input_value_temp.length;i++){
            var _l_l_temp_temp = parseInt(_input_value_temp.substr(i,1),10) * _l_l_jym[i];
            _l_l_total += _l_l_temp_temp;
          }
          _l_l_total --;
          var _last_number = _l_l_total % 11;//最后一位
          if(_last_number==0){
            _last_char = 0;
          }else{
            if(_last_number==1){
              _last_char="X";
            }
            else{
              _last_char = 11 - _last_number;
            }
          }
          _input_value_temp = _input_value_temp + _last_char;
          return _input_value_temp;
        }else{
          return _input_value;
        }
      }

      //判断字符串是否符合日期格式，如1999-03-07
      function isDate(theStr) {
        var strObj=new String(theStr);

        var strObjTemp;
        //1.theStr.length<>10
        if(strObj.length!=10&&strObj.length!=7){
          return false;
        }
        //2.判断第五位、第八位是"-"
        if(strObj.substring(4,5)!="-"){
          return false;
        }
        if(strObj.length==10){
          if(strObj.substring(7,8)!="-"){
            return false;
          }
        }
        //3.校验年部分是数字，并在1900~2100之间，月部分是数字，并在1~12之间，日部分是数字，并在1~31之间
        strObjTemp=new String(strObj.substring(0,4));

        if(isNumber(strObjTemp)==false || parseInt(strObjTemp,10)<=1900 || parseInt(strObjTemp,10)>2100)
          return false;
        strObjTemp=new String(strObj.substring(5,7));

        if(isNumber(strObjTemp)==false || parseInt(strObjTemp,10) < 1  || parseInt(strObjTemp,10)>12)
          return false;

        if(strObj.length==10){
          strObjTemp=new String(strObj.substring(8,10));
          if(isNumber(strObjTemp)==false || parseInt(strObjTemp,10)<1 || parseInt(strObjTemp,10)>31)
            return false;
        }

        if(strObj.length==10){
          if(isRightdate(theStr)==false){
            return false;
          }
        }
        return true;
      }

      //判断是不是合法日期
      function isRightdate(theStr) {
        var strObj=new String(theStr);
        var theYear=parseInt(strObj.substring(0,4),10);
        var theMonth=parseInt(strObj.substring(5,7),10);
        var theDay=parseInt(strObj.substring(8,10),10);
        switch(theMonth){
          case 4:
          case 6:
          case 9:
          case 11:
            if(theDay==31)
              return false;
            else
              break;
          case 2:
            if((theYear%4==0 && theYear%100!=0) || theYear%400==0){//润年2月份29天
              if(theDay>29) return false;
            }
            else{
              if(theDay>28) return false;
            }
            break;
          default: break;
        }
        return true;
      }

      //获取长度 中文和全角符号长度计为2
      function _byte_count(_strvalue) { 
        _strvalue = _strvalue.replace(/([\u0391-\uFFE5])/ig,'xs');
        var count = _strvalue.length;
        return count;
      }
      
      //失焦后判断
      _this.on('blur', '[validate]', function(){
        //功能：是否为空，是否正则匹配，是否溢出
        var matchResult = $(this).val().match(regExp[$(this).attr('validate')]);
        var resultStr = [];
        
        var require = $(this).attr('require');
        var errMsg;
        if($(this).attr('errMsg')){
          errMsg = $(this).attr('errMsg');
        }
        if($(this).attr('tips')){
          tipsMsg = $(this).attr('tips');
        }
        //是否为空
        if(require !== undefined){
          if($(this).val()==''){
            //resultStr = errMsg ? errMsg : tipsMsg + '不能为空';
            resultStr.push(errMsg ? errMsg : tipsMsg + '不能为空');
            //$(this).next('span').html(errMsg ? errMsg : tipsMsg + '不能为空');
            flag = false;
          }
        }

        //正则匹配
        var pattern = $(this).attr('pattern');
        if(pattern){
          var match = $(this).val().match($(this).attr('pattern'));
          if(!match && $(this).val() != ''){
            //resultStr = errMsg ? errMsg : '请输入有效的'+ tipsMsg +'信息';
            resultStr.push(errMsg ? errMsg : '请输入有效的'+ tipsMsg +'信息');
            //$(this).next('span').html(resultStr);
            flag = false;
          }
        }
        //是否溢出
        var maxlen = $(this).attr('maxlen');
        var minlen = $(this).attr('minlen');
        var len = _byte_count($(this).val());
        if(maxlen || minlen){
          if(!($(this).val() == '' || $(this).val() == $(this).attr('placeholder') )){
            if(len > maxlen){
              //resultStr = errMsg ? errMsg : tipsMsg+'最多输入' + maxlen + '个字';
              //$(this).next('span').html(resultStr);
              flag = false;
              resultStr.push(errMsg ? errMsg : tipsMsg+'最多输入' + maxlen + '个字符');
            }
            if(len < minlen){
              //resultStr = errMsg ? errMsg : tipsMsg+'最少输入' + minlen + '个字';
              //$(this).next('span').html(resultStr);
              flag = false;
              resultStr.push(errMsg ? errMsg : tipsMsg+'最少输入' + minlen + '个字符');
            }
          }
        }

        //full normal类型
        if($(this).attr('validate') == 'full' || $(this).attr('validate') == 'normal' || $(this).attr('validate') == 'full_chinese'){
          if(matchResult){
            //resultStr = errMsg ? errMsg : tipsMsg+'含有非法字符'+unique(matchResult).join('');
            //$(this).next('span').html(resultStr);
            flag = false;
            resultStr.push(errMsg ? errMsg : tipsMsg+'含有非法字符'+unique(matchResult).join(''));
          }
        //身份证验证，包含15位扩展到18位
        }else if($(this).attr('validate') == 'sfzhm'){
          var self = $(this);
          self.val(self.val().toUpperCase());
          var self_temp = self.val()+"";
          var self_value = new String(self_temp);
          var self_jym = new Array(7,9,10,5,8,4,2,1,6,3,7,9,10,5,8,4,2,1);
          var self_total = 0;
          //位数校验
          if (self_temp && self_value.length!=15 && self_value.length!=18){
            //resultStr = errMsg ? errMsg : tipsMsg+'必须为15位或18位';
            //$(this).next('span').html(resultStr);
            flag = false;
            resultStr.push(errMsg ? errMsg : tipsMsg+'必须为15位或18位');
          }
          //15校验
          if (self_value.length == 15){ 
              if(isNumber(self_value)==false){
              //resultStr = errMsg ? errMsg : tipsMsg+'输入错误，应全为数字';
              //$(this).next('span').html(resultStr);
                flag = false; 
                resultStr.push(errMsg ? errMsg : tipsMsg+'输入错误，应全为数字'); 
              }   
            //15位转18位
            self_value = convertSfzhm(self_value);
          }       
          var _l_s_temp = self_value.substr(0,17);
          if (self_temp && isNumber(_l_s_temp)==false){
            //resultStr = errMsg ? errMsg : tipsMsg+'前17位输入错误，应全为数字';
            //$(this).next('span').html(resultStr);
              flag = false;
              resultStr.push(errMsg ? errMsg : tipsMsg+'前17位输入错误，应全为数字');       
          }     
          var _last_char = self_value.substring(17,18);
          if (self_temp && isNumber(_last_char)==false && _last_char!="x" && _last_char!="X"){
            //resultStr = errMsg ? errMsg : tipsMsg+'最后一位输入错误';
            //$(this).next('span').html(resultStr);
            flag = false;
            resultStr.push(errMsg ? errMsg : tipsMsg+'最后一位输入错误');   
          }
          var _l_s_temp_temp = self_value.substr(6,8);
          var _l_s_temp  = new String(_l_s_temp_temp);
          var _year  = _l_s_temp.substring(0,4);
          var _month = _l_s_temp.substring(4,6);
          var _day   = _l_s_temp.substring(6,8);
          var _l_l_temp_temp;
          var _l_s_csny = _year + "-" + _month + "-" + _day;
          //是否是合法日期
          if (self_temp && isDate(_l_s_csny)==false){
            //resultStr = errMsg ? errMsg : tipsMsg+'出生年月日不正确';
            //$(this).next('span').html(resultStr);
            flag = false;
            resultStr.push(errMsg ? errMsg : tipsMsg+'出生年月日不正确');
          }
          for(var i=0;i<self_value.length - 1;i++){
            _l_l_temp_temp = parseInt(self_value.substr(i,1),10) * self_jym[i];
            self_total += _l_l_temp_temp;
          }
          if (isNumber(self_value.substring(17,18))){
            self_total += parseInt(self_value.substring(17,18),10);
          }
          if (self_value.substring(17,18)=="X" || self_value.substring(17,18)=="x"){
            self_total += 10;
          }
          self_total --;
          if (self_temp && self_total%11!=0){
            console.log(11);
            //resultStr = errMsg ? errMsg : tipsMsg+'输入不正确';
            //$(this).next('span').html(resultStr);
            flag = false;
            resultStr.push(errMsg ? errMsg : tipsMsg+'输入不正确');
          }
          self.val(self_value);
        //小数保留几位验证
        }else if($(this).attr('validate') == 'double' && matchResult){
          if($(this).val()){
            var self = $(this);
            var maxf = self.attr('maxf') ? self.attr('maxf') : 2;
            var _input_value = _to_trim_all(self.val());
            var _index = _input_value.indexOf(".");
            var _index_length = _input_value.substr(_index+1).length;
            var fl = new String;
            if(_index == -1){
              for( var i=0; i<maxf; i++){
                fl += '0';
              }
              _input_value = _input_value + '.' + fl;
              self.val(_input_value);
            }else{
              if(_index_length > maxf){
                //resultStr = errMsg ? errMsg : tipsMsg+'小数点后最多输入'+ maxf +'位';
                //$(this).next('span').html(resultStr);
                flag = false;
                resultStr.push(errMsg ? errMsg : tipsMsg+'小数点后最多输入'+ maxf +'位');
              }else{
                var nowl = maxf - _index_length;
                for( var i=0; i<nowl; i++){
                  fl += '0';
                }
                _input_value = _input_value + fl;
                self.val(_input_value);
              }
            }
          }
        }else{
          //输入错误信息
          if(!matchResult && $(this).val() != ''){
            //resultStr = errMsg ? errMsg : tipsMsg+'输入不正确';
            //$(this).next('span').html(resultStr);
            //return false;
            resultStr.push(errMsg ? errMsg : tipsMsg+'输入不正确');
          }else if($(this).attr('validate') == 'vserve'){
          //服务器验证信息
            if(sessionStorage.getItem('id_token')){
              $.ajaxSetup({
                  headers: {         
                    'Authorization':'Bearer ' +  sessionStorage.getItem('id_token')
                  }
              });
            }
            var now = $(this);
            var url = now.attr('val-url');
            var postData = JSON.stringify(now.val());
            var succMsg;
            if($(this).attr('succMsg')){
              succMsg = $(this).attr('succMsg');
            }
            $.ajax({
              "url":url,
              "type":"POST",
              "data":postData,
              "success":function(data){
                now.next('span').html(succMsg ? succMsg : "信息验证成功");
                now.next('span').css("color","#09dd3a");
              },
              "error":function(jqXHR,textStatus,errorThrown){
                resultStr.push(errMsg ? errMsg : jqXHR.statusText);
                var span_c='';
                for(var i=0; i<resultStr.length; i++){
                  if(i<resultStr.length-1){
                    span_c += resultStr[i]+'</br>';
                  }else{
                    span_c += resultStr[i];
                  }
                }
                now.next('span').html(span_c);
                ajaxf = false;
              }
            });
          }
        }
        var span_c='';
        for(var i=0; i<resultStr.length; i++){
          if(i<resultStr.length-1){
            span_c += resultStr[i]+'</br>';
          }else{
            span_c += resultStr[i];
          }
        }
        $(this).next('span').html(span_c);
      });


      //聚焦清除
      _this.on('focus', '[validate]', function(){
        if(!$(this).val()){
          $(this).next('span').html('');
        }
        if($(this).next('span').html()){
          $(this).next('span').html('');
        }
        flag = true;
      });
      $('input:checkbox').click(function(){
        $(this).siblings('span').html('');
      })

      //存在必填项并且未输入任何信息，点击提交进行检测
      function vrequire(){
        var is_right = true;
        //必填input验证
        $("input[require]").each(function(i){
          if($(this).val() == ''){
            is_right = false;
            errMsg = $(this).attr('errMsg');
            tipsMsg = $(this).attr('tips');
            var resultStr = errMsg ? errMsg : tipsMsg+'不能为空';
            $(this).next('span').html(resultStr);
          }
        });
        //必填textarea验证
        $("textarea[require]").each(function(i){
          if($(this).val() == ''){
            is_right = false;
            errMsg = $(this).attr('errMsg');
            tipsMsg = $(this).attr('tips');
            var resultStr = errMsg ? errMsg : tipsMsg+'不能为空';
            $(this).next('span').html(resultStr);
          }
        });

        return is_right;
      }

      //checkbox
      function vcheckbox(_this){
        var is_right = true;
        var resultStr;
        var un_check = _this.find('input:checkbox');
        var check = _this.find('input:checkbox:checked')
        var min = un_check.attr('minnum');
        var max = un_check.attr('maxnum');
        if(un_check.length>0){
          if(check.length >= min && check.length <= max){
            is_right = true;
          }else if(check.length > max){
            errMsg = un_check.attr('errMsg');
            tipsMsg = un_check.attr('tips');
            resultStr = errMsg ? errMsg : tipsMsg+'至多选择' + max + '项';
            un_check.siblings('span').html(resultStr);
            is_right = false;
          }else{
            errMsg = un_check.attr('errMsg');
            tipsMsg = un_check.attr('tips');
            resultStr = errMsg ? errMsg : tipsMsg+'至少选择' + min + '项';
            un_check.siblings('span').html(resultStr);
            is_right = false;
          }
        }
        
        return is_right;
      }

      //获取提交按钮
      _this.find('[vtotal]').click(function(){
        var is_right;
        var r = vrequire(_this);
        var v_r = true;
        _this.find('input').next('span').each(function(i){
            if($(this).html()){
                  v_r = false;
            }
        });
        _this.find('textarea').next('span').each(function(i){
            if($(this).html()){
                  v_r = false;
            }
        });

        var v_c = vcheckbox(_this);
        if(ajaxf && flag && r && v_r && v_c){
            alert("验证通过内容");
            if(callB){
              callB();
            }
        }else{
            alert("验证不通过内容");
        }
      });
    }
    
  
})($);
module.exports = $;