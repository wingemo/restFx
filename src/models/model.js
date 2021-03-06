/* 
   Property of Swedbank AB
   Philip Wingemo, Emil Oad
   Created: 2021-08-25
*/

/*
- Sends a POST request to the adapter
- Data comes from the controller
*/
function model(obj, sum, date, side, tenor) {
	var output;
	$.ajax({
		async: false,
		method: "POST",
		url: "http://3.67.145.166/partner/sandbox/v1/fx/market-order/orders/adapter/adapter.php",
		data: {
			amount: sum,
			amountCurrency: obj[3],
			currencyPair: obj[3] + "SEK",
			externalId: obj[0],
			meansOfPayment: "HEDGE",
			settlementDate: date,
			side: side,
                        tenor: tenor,
			timeout: 11000
		}
	}).done(function(msg) {
		output = JSON.parse(msg);
	});
	return output;
	console.log(tenor);

};
