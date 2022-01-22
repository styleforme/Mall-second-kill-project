$(document).ready(function () {
    get_items();
});

function get_items() {
    $.ajax({
        type: "GET",
        url: SERVER_PATH + "/item/list",
        xhrFields: {withCredentials: true},
        success: function (result) {
            if (result.status) {
                alertBox(result.data.message);
                return false;
            }
            set_items(result.data);
        }
    });
}

function set_items(items) {
    if (!items) {
        return false;
    }

    $.each(items, function (i, item) {
        // 定义模板
        var div = 
            '<div class="col-sm-3 goods">' +
                '<div class="row goods-link">' +
                    '<a href="item.html"><img src=""/><h4></h4><p>限量<span>0</span>件！</p></a>' +
                '</div>' +
                '<div class="row goods-info">' +
                    '<div class="col-sm-8">' +
                        '<div class="row price"><b>&yen;<span>0.00</span></b><i>&yen;<del>0.00</del></i></div>' +
                        '<div class="row stock"><i>已售<span>0</span>件！</i></div>' +
                    '</div>' +
                    '<div class="col-sm-4 bill-button"><a href="#">立即抢购</a></div>' +
                '</div>' +
            '</div>';
        
        // 设置数据
        var $obj = $(div);
        $obj.find(".goods-link a").attr("href", "item.html?id=" + item.id);
        $obj.find(".goods-link img").attr("src", item.imageUrl);
        $obj.find(".goods-link span").text(item.itemStock.stock);
        $obj.find(".goods-info .price span").text(item.promotion.promotionPrice);
        $obj.find(".goods-info .price del").text(item.price);
        $obj.find(".goods-info .stock span").text(item.sales);
        $obj.find(".goods-info .bill-button a").attr("href", "item.html?id=" + item.id);

        // 显示内容
        $(".goods-list").append($obj);
    });
}