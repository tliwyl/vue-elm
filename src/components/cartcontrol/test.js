/**
 *  created on 2018/4/23.
 *  author litao
 */
 function ajax(opt){
  var url = opt.url;
  var type = opt.type.toLowerCase() == 'post' ? 'post' : 'get';
  var dataType = opt.dataType ? opt.dataType : 'json';
  var data = opt.data ? opt.data : {};
  var async = !!opt.async ? true : false;
  var succ = typeof opt.succ == 'function' ? opt.succ : function(){};
  var error = typeof opt.error =='function' ? opt.error : function(){};

  var xhr = new XMLHttpRequest();
  if(type === 'get'){
    url = concatDataToUrl(url,data);
  }
  if(type === 'post'){
    xhr.setRequestHeader('content-type','application/x-www-form-urlencoded');
  }
  xhr.open(type,url,async);
  if(type === 'get'){
    xhr.send(null);
  }else{
    xhr.send(data);
  }
  xhr.onreadystatechange = function(){
    if(xhr.readyState == 4){
      var res = xhr.responseText;
      if(xhr.status == 200){
        if(dataType == 'json'){
          res = JSON.parse(res);
        }
        succ(res);
      }else{
        error(res);
      }
    }
  }

}
