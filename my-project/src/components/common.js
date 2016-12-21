var md5key = "testapiprikey";
/**签名生成并加密**/
var getFinalParams = function(values){
	var currentDate = new Date().getTime();
	var randomTemp = getRanChar(6);
	values.t = currentDate;
	values.s = randomTemp;
	//values = {"t":currentDate,"s":randomTemp};
	//MD5
	//var check=faultylabs.MD5(md5key+getSortString(values));
	var hash = hex_md5(md5key+getSortString(values));
	values.check = hash;
	// console.log(currentDate);
	// console.log("randomTemp:" + randomTemp);
	// console.log("hash:" + hash);
	console.log(values);
	return values;
}
/**随机字符串**/
var getRanChar = function(n){
	var chars = ['0','1','2','3','4','5','6','7','8','9','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
	var res = "";
	for(var i = 0; i < n ; i ++) {
        var id = Math.ceil(Math.random()*35);
        res += chars[id];
    }
	return res;
}
/**排序请求**/
var getSortString = function(values){
	var i,sort={},checkString="",arr = new Array();
	for(var n in values){
		arr.push(n);
	}
	arr = arr.sort();
	for(var n in arr){
		checkString+="&"+arr[n]+"="+values[arr[n]];
	}
	return checkString;
}
//console.log(getFinalParams(para));

var commonAjax = function(url,callback,para){
	var prefix = "http://139.224.65.231/resurgam";
	$.ajax({
			url : prefix + url,
			method : "get",
			data:getFinalParams(para),
			success: function(data) {
				if(callback){
					callback(data);
				}
			}
		});
}

var para = {"pageNo":0,"maxNum":20};
var execute = function(data){
	data = JSON.parse(data);
	console.log(data.data);
}
commonAjax("/api/index.xhtml",execute,para);
