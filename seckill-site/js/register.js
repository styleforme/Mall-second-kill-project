$(document).ready(function () {
    // 验证码单击事件
    $("#btn-otp").click(function (e) { 
        get_otp(e);
    });
    // 立即注册单击事件
    $("#btn-register").click(function (e) { 
        register(e);
    });
});

function get_otp(e) {
    var phone = $("#phone").val();
    if (!phone) {
        alertBox("请输入手机号！");
        return false;
    }

    $.ajax({
        type: "GET",
        url: SERVER_PATH + "/user/otp/" + phone,
        xhrFields: {withCredentials: true},
        success: function (result) {
            if (result.status) {
                alertBox(result.data.message);
                return false;
            }
            alertBox("验证码已发送，请注意查收！");
        }
    });
}

function register(e) {
    var phone = $("#phone").val();
    var otp = $("#otp").val();
    var password = $("#password").val();
    var password_confirm = $("#password-confirm").val();
    var nickname = $("#nickname").val();
    var gender = $("#gender").val();
    var age = $("#age").val();

    if (!phone) {
        alertBox("手机号不能为空！");
        return false;
    }
    if (!otp) {
        alertBox("验证码不能为空！");
        return false;
    }
    if (!password) {
        alertBox("密码不能为空！");
        return false;
    }
    if (!password_confirm || password_confirm != password) {
        alertBox("两次输入的密码不一致！");
        return false;
    }
    if (!nickname) {
        alertBox("昵称不能为空！");
        return false;
    }
    if (gender == "0") {
        alertBox("性别不能为空！");
        return false;
    }
    if (!age) {
        alertBox("年龄不能为空！");
        return false;
    }

    $.ajax({
        type: "POST",
        url: SERVER_PATH + "/user/register",
        data: {
            "phone": phone,
            "otp": otp,
            "password": password,
            "nickname": nickname,
            "gender": gender,
            "age": age
        },
        xhrFields: {withCredentials: true},
        success: function (result) {
            if (result.status) {
                alert(result.data.message);
                return false;
            }
            alertBox("注册成功！", function(){
                window.location.href = "login.html";
            });
        }
    });    
}