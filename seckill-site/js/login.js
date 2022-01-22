$(document).ready(function () {
    // 立即登录单击事件
    $("#btn-login").click(function (e) { 
        login(e);
    });
});

function login(e) {
    var phone = $("#phone").val();
    var password = $("#password").val();

    if (!phone) {
        alertBox("手机号不能为空！");
        return false;
    }
    if (!password) {
        alertBox("密码不能为空！");
        return false;
    }

    $.ajax({
        type: "POST",
        url: SERVER_PATH + "/user/login",
        data: {
            "phone": phone,
            "password": password
        },
        xhrFields: {withCredentials: true},
        success: function (result) {
            if (result.status) {
                alertBox(result.data.message);
                return false;
            }
            // token -> sessionStorage
            window.sessionStorage.setItem("token", result.data);
            alertBox("登录成功！", function() {
                window.location.href = "seckill.html";
            });
        }
    });
}