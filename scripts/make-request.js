$(document).ready(function() {
    $.ajax({
         method: "GET",
         url: "https://psd2.api.swedbank.com/partner/sandbox/v1/fx/market-order/orders",
    .done(function(msg) {
        console.log(JSON.parse(msg));
    })
});
