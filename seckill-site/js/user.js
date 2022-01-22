$(document).ready(function () {
    // 设置用户登录状态
    set_login_status();
    // 注销按钮单击事件
    $("#btn-logout").click(function (e) { 
        logout();        
    });
});

// 监听jQuery的ajax事件
// $(document).ajaxSend(function(event, jqXHR, ajaxOptions){
//     ajaxOptions.url += ajaxOptions.url.match(/\?/) ? "&" : "?";
//     ajaxOptions.url += "token=" + window.localStorage.getItem("token");
// });

function set_login_status() {
    var $A = $(".user-name");
    if (!$A) return false;

    $.ajax({
        type: "GET",
        url: SERVER_PATH + "/user/status?token=" + window.sessionStorage.getItem("token"),
        xhrFields: {withCredentials: true},
        success: function (result) {
            if (result.status == "0" && result.data) {
                $A.text(result.data.nickname);
                $("#user-info").show();
            } else {
                $("#user-info").hide();
            }
        }
    });    
}

function logout() {
    $.ajax({
        type: "GET",
        url: SERVER_PATH + "/user/logout?token=" + window.sessionStorage.getItem("token"),
        xhrFields: {withCredentials: true},
        success: function (result) {
            if (result.status) {
                alertBox(result.data.message);
                return false;
            }
            alertBox("已经注销！", function(){
                window.location.href = "./login.html"
            });
        }
    });    
}