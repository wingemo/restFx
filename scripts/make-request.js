$(document).ready(function() {
    $.ajax({
            method: "POST",
            url: "http://3.67.145.166/partner/sandbox/v1/fx/market-order/orders/middleware/adapter.php",
            data: {
                amount: sum,
                amountCurrency: 1000,
                currencyPair: "EURSEK",
                externalId: 212112,
                meansOfPayment: "HEDGE",
                settlementDate: "2021-08-30",
                side: "BUY,
                timeout: 11000
            }
        })
        .done(function(msg) {
            console.log(JSON.parse(msg));
        })
});
