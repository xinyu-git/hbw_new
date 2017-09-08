
$(function(){
	//关闭 弹窗
	$(document).on("click","#alertInfo .close",dialog.closeDiv);
	// 弹窗视频
	$(document).on("click",".video_start",function(){
		var url=$(this).attr("data-url");
		var vuId=getQueryString(url).vu;
		var _ww = $(".wrap").width();
		video_w = 640;
		video_h = 360;
		player = new CloudVodPlayer();
		if(_ww<640){
			video_w = _ww;
			video_h = _ww*360/640
		}
		dialog.showInfo("<div id='vInfo' class='vInfo' style='height:"+video_h+"px'></div>");
		$("#maskLayer").addClass("close");
		$('#alertInfo .close').show();
		player.init({"uu":"661c07e19e","vu":vuId,"auto_play":1,"width":video_w,"height":video_h,"lang":"zh_CN"},"vInfo");
	})
	function getQueryString(url){
		var qs = url;
		var args = {};
		var items = qs.split("&");
		var ite = null;
		var name = null;
		var value = null;
		for (var i = 0; i < items.length; i++) {
			//ite=items[i].split("=");
			var firstEqual = items[i].indexOf("=")
			name = items[i].substring(0, firstEqual);
			value = items[i].substring(firstEqual + 1);
			args[name] = value;
		}
		return args;
	}
})

var Tips; if (!Tips) Tips = {};
/**
 * 显示隐藏 登陆框
 */
Tips.showLogin = function(){
	//显示登陆框的时候刷新验证码
	//Util.verifyImg();
	dialog.alertLog('请登录','dialog.closeDiv()');
	//背景模糊
	$('.wrap').addClass('row');
    // dialog.alertLog("请登录","dialog.alertMsg(\"提示\",\"签到失败！\",\"dialog.closeDiv()\",\"d\")");
}
/**
 * 显示隐藏 提示弹窗
 */
Tips.showTips = function(Msg){
	dialog.alertMsg("恭喜您",Msg,"dialog.closeDiv()","s");
}
/**
 * 显示隐藏 提示未登录弹窗
 */
Tips.showLoginTwo = function(){
	 dialog.alertLogTwo("dialog.alertLog(\"请登录\",\"dialog.closeDiv()\")","dialog.closeDiv()");
}
/**
 * 显示隐藏 个人动态弹窗
 */
Tips.showPerDt = function(){
	 dialog.alertPerDt();
}

/**
 * 显示隐藏 视频弹窗
 */
Tips.showVideo = function(){
	 dialog.alertVideo();
}

