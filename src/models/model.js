function model(obj, sum, date, side) {
    let tmp;
    $.ajax({
            method: "POST",
            url: "http://3.67.145.166/partner/sandbox/v1/fx/market-order/orders/middleware/adapter/adapter.php",
            data: {
                amount: sum,
                amountCurrency: obj[3],
                currencyPair: obj[3] + "SEK",
                externalId: obj[0],
                meansOfPayment: "HEDGE",
                settlementDate: date,
                side: side,
                timeout: 11000
            }
        })
        .done(function(msg) {
            tmp = JSON.parse(msg);
             console.log(tmp);
        })
    console.log(tmp);
    return tmp;
}
