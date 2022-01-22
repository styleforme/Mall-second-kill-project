$(document).ready(function () {
    // 获取ID
    var itemId = $.getUrlParam("id");
    // 加载数据
    get_item(itemId);
    // 立即购买单击事件
    $("#buy").click(function (e) { buy(itemId); });
});

function get_item(itemId) {
    $.ajax({
        type: "GET",
        url: SERVER_PATH + "/item/detail/" + itemId,
        xhrFields: {withCredentials: true},
        success: function (result) {
            if (result.status) {
                alertBox(result.data.message);
                return false;
            }
            set_item(result.data);
        }
    });
}

function set_item(item) {
    if (!item) return false;

    $(".goods-left img").attr("src", item.imageUrl);
    $(".goods-right .goods-title div").text(item.title);
    $(".goods-right .seckill-price b").text(item.promotion.promotionPrice);
    $(".goods-right .goods-price del").text(item.price);
    $(".goods-right .goods-sales span").text(item.sales);
    $(".goods-right .goods-detail div").html(item.description);

    $("#stock").val(item.itemStock.stock);
    $("#promotionId").val(item.promotion.id);
}

function buy(itemId) {
    var stock = $("#stock").val();
    var promotionId = $("#promotionId").val();
    var amount = parseInt($("#amount").val());

    if (!amount || amount <= 0 || amount > stock) {
        alertBox("请输入正确的数量！");
        return false;
    }

    if (promotionId) {
        generate_token(itemId, amount, promotionId);
    } else {
        create_order(itemId, amount);
    }
}

function generate_token(itemId, amount, promotionId) {
    var imageUrl = SERVER_PATH + "/order/captcha?token=" + sessionStorage.getItem("token");
    captchaBox(imageUrl, function(){
        var captcha = $("#captchaText").val();
        if (!captcha) return false;
        $.ajax({
            type: "POST",
            url: SERVER_PATH + "/order/token?token=" + sessionStorage.getItem("token"),
            data: {
                "itemId": itemId,
                "promotionId": promotionId,
                "captcha": captcha
            },
            xhrFields: {withCredentials: true},
            success: function (result) {
                if (result.status) {
                    alertBox(result.data.message, function(){
                        if (result.data.code == "101") location.href = "./login.html";
                    });
                    return false;
                }
                create_order(itemId, amount, promotionId, result.data);
            }
        });
    });
}

function create_order(itemId, amount, promotionId, promotionToken) {
    $.ajax({
        type: "POST",
        url: SERVER_PATH + "/order/create?token=" + sessionStorage.getItem("token"),
        data: {
            "itemId": itemId,
            "amount": amount,
            "promotionId": promotionId,
            "promotionToken": promotionToken
        },
        xhrFields: {withCredentials: true},
        success: function (result) {
            if (result.status) {
                alertBox(result.data.message, function(){
                    if (result.data.code == "101") location.href = "./login.html";
                });
                return false;
            }
            alertBox("下单成功！", function(){
                location.href = "./seckill.html"
            });
        }
    });    
}