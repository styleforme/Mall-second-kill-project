/**
 * 服务端PATH
 */
var SERVER_PATH = "http://127.0.0.1:8080";

/**
 * 获取URL中的参数
 */
(function($) {
    $.getUrlParam = function (name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = location.search.substr(1).match(reg);
        if (r != null) return unescape(r[2]); return null;
    }
})(jQuery);

/**
 * 自定义弹出框
 * 
 * @param {*} message  提示消息
 * @param {*} callback 回调函数，在弹出框关闭时触发。
 */
function alertBox(message, callback) {
	if (!message) return false;

	var template_alert_box = 
		'<div class="modal" id="alert-box" tabindex="-1" role="dialog">'+
			'<div class="modal-dialog" role="document" style="margin:100px auto;">'+
				'<div class="modal-content">'+
					'<div class="modal-header">'+
						'<h5 class="modal-title">提示</h5>'+
						'<button type="button" class="close" data-dismiss="modal" aria-label="Close">'+
							'<span aria-hidden="true">&times;</span>'+
						'</button>'+
					'</div>'+
					'<div class="modal-body">'+
						'<p id="alert-box-message"></p>'+
					'</div>'+
					'<div class="modal-footer">'+
						'<button type="button" class="btn btn-secondary" data-dismiss="modal">确定</button>'+
					'</div>'+
				'</div>'+
			'</div>'+
		'</div>';

	if ($("#alert-box")) $("#alert-box").remove();

	var $box = $(template_alert_box);
	$box.find("#alert-box-message").text(message);
	$box.modal({backdrop:"static", show:true});
	if (callback) $box.on('hidden.bs.modal', callback);
	$("body").append($box);

	return true;
}

/**
 * 验证码弹出框
 * 
 * @param {*} imageUrl 验证码URL  
 * @param {*} callback 回调函数，在弹出框关闭时触发。
 */
function captchaBox(imageUrl, callback) {
	if (!imageUrl) return false;

	var template_captcha_box = 
		'<div class="modal" id="captcha-box" tabindex="-1" role="dialog">'+
			'<div class="modal-dialog" role="document" style="margin:100px auto;">'+
				'<div class="modal-content">'+
					'<div class="modal-header">'+
						'<h5 class="modal-title">提示</h5>'+
						'<button type="button" class="close" data-dismiss="modal" aria-label="Close">'+
							'<span aria-hidden="true">&times;</span>'+
						'</button>'+
					'</div>'+
					'<div class="modal-body">'+
						'<p>'+
                            '<a href="javascript:void(0);"><img src="" id="captchaImg" style="width:130px;height:48px;" /></a>&nbsp;&nbsp;'+
                            '<input type="text" id="captchaText" style="vertical-align: bottom;" placeholder="请输入验证码"/>'+
                        '</p>'+
					'</div>'+
					'<div class="modal-footer">'+
						'<button type="button" class="btn btn-secondary" data-dismiss="modal">确定</button>'+
					'</div>'+
				'</div>'+
			'</div>'+
		'</div>';

    if ($("#captcha-box")) $("#captcha-box").remove();
    var $box = $(template_captcha_box);
	$box.find("#captchaImg").attr("src", getRandomUrl(imageUrl));
	$box.find("#captchaImg").on("click", function(){
		$(this).attr("src", getRandomUrl(imageUrl));
	});
	$box.modal({backdrop:"static", show:true});
	if (callback) $box.on('hidden.bs.modal', callback);
	$("body").append($box);

	return true;
}

function getRandomUrl(url) {
	if (!url) return "";
	var randomUrl = url;
	randomUrl += randomUrl.match(/\?/) ? "&" : "?";
	randomUrl += "CAPTCHA_KEY=" + new Date().getTime();
	return randomUrl;
}