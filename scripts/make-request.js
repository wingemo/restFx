$(document).ready(function() {
    $.ajax({
            method: "GET",
            url: "http://3.67.145.166/partner/sandbox/v1/fx/market-order/orders/middleware/adapter.php",
        .done(function(msg) {
            console.log(JSON.parse(msg));
        })
});
